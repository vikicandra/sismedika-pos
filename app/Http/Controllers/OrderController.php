<?php
namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Enums\TableStatus;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\ProductCategory;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['table', 'detail', 'detail.product', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();
        $statuses = array_column(OrderStatus::cases(), 'value');
        return Inertia::render('orders/index', [
            'orders'   => $orders,
            'statuses' => $statuses,
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Order::class);
        $tables              = Table::select('id', 'name', 'status')->get();
        $countTablesByStatus = $tables->groupBy('status')->map(fn($group) => $group->count())->toArray();
        $statuses            = array_column(TableStatus::cases(), 'value');
        return Inertia::render('orders/create', [
            'tables'              => $tables,
            'statuses'            => $statuses,
            'countTablesByStatus' => $countTablesByStatus,
        ]);
    }

    public function cart($id)
    {
        Gate::authorize('create', Order::class);
        $table = Table::find($id);
        if ($table->status != 'available') {
            return to_route('orders.create')->with('message', 'Table is not available');
        }
        $categories = ProductCategory::with('products')->get();
        $now        = Carbon::now()->format('F j, Y');
        return Inertia::render('orders/cart', [
            'table_id'   => $id,
            'categories' => $categories,
            'now'        => $now,
        ]);
    }

    public function store(StoreOrderRequest $request)
    {
        Gate::authorize('create', Order::class);
        $validated = $request->validated();
        DB::beginTransaction();
        try {
            $table         = Table::find($validated['table_id']);
            $table->status = 'occupied';
            $table->save();

            $order = Order::create([
                'table_id'      => $validated['table_id'],
                'user_id'       => auth()->user()->id,
                'total_price'   => $validated['total_price'],
                'customer_name' => $validated['customer_name'],
                'status'        => 'open',
            ]);

            $order->detail()->createMany(collect($request->items)->map(fn($p) => [
                'product_id' => $p['id'],
                'price'      => $p['price'],
                'quantity'   => $p['quantity'],
                'sub_total'  => $p['price'] * $p['quantity'],
            ])->toArray());

            DB::commit();
            return to_route('orders.index')->with('message', 'Success');
        } catch (\Throwable $th) {
            Log::error($th);
            DB::rollback();
            return redirect()->back()->with('error', 'Error');
        }
    }

    public function edit($id)
    {
        Gate::authorize('update', Order::class);
        $order = Order::where('id', $id)
            ->with(['detail', 'detail.product', 'user'])
            ->first();
        $categories = ProductCategory::with('products')->get();
        $now        = $order->created_at->format('F j, Y');
        return Inertia::render('orders/edit', [
            'order'      => $order,
            'categories' => $categories,
            'now'        => $now,
        ]);
    }

    public function update(UpdateOrderRequest $request, $order)
    {
        Gate::authorize('update', Order::class);
        $validated  = $request->validated();
        $orderModel = Order::findOrFail($order);

        DB::beginTransaction();
        try {
            $orderModel->update([
                'customer_name' => $validated['customer_name'],
                'total_price'   => $validated['total_price'],
            ]);

            // Hapus detail pesanan lama
            $orderModel->detail()->delete();

            // Buat detail pesanan baru dari data yang divalidasi
            $orderModel->detail()->createMany($validated['detail']);

            DB::commit();
            return to_route('orders.index')->with('message', 'Order updated successfully');
        } catch (\Throwable $th) {
            Log::error($th);
            DB::rollback();
            return redirect()->back()->with('error', 'Error updating order');
        }
    }

    public function show($order)
    {
        $order = Order::where('id', $order)
            ->with(['detail', 'detail.product', 'user'])
            ->first();
        $now = $order->created_at->format('F j, Y H:i');
        return Inertia::render('orders/show', [
            'order' => $order,
            'now'   => $now,
        ]);
    }

    public function closeOrder($order)
    {
        Gate::authorize('closeOrder', Order::class);
        DB::beginTransaction();
        try {
            $order         = Order::find($order);
            $order->status = 'closed';
            $order->save();

            $order->table()->update(['status' => 'available']);

            DB::commit();
            return to_route('orders.index')->with('message', 'Order closed successfully');
        } catch (\Throwable $th) {
            Log::error($th);
            DB::rollBack();
            return redirect()->back()->with('error', 'Error closing order');
        }
    }
}

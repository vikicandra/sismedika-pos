<?php
namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Enums\TableStatus;
use App\Models\Order;
use App\Models\Table;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['table', 'detail', 'detail.product', 'user'])
            ->get();
        $statuses = array_column(OrderStatus::cases(), 'value');
        return Inertia::render('orders/index', [
            'orders'   => $orders,
            'statuses' => $statuses,
        ]);
    }

    public function create()
    {
        $tables              = Table::select('id', 'name', 'status')->get();
        $countTablesByStatus = $tables->groupBy('status')->map(fn($group) => $group->count())->toArray();
        $statuses            = array_column(TableStatus::cases(), 'value');
        return Inertia::render('orders/create', [
            'tables'              => $tables,
            'statuses'            => $statuses,
            'countTablesByStatus' => $countTablesByStatus,
        ]);
    }
}

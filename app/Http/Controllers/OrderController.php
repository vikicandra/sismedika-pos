<?php
namespace App\Http\Controllers;

use App\Enums\TableStatus;
use App\Models\Table;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $tables              = Table::select('id', 'name', 'status')->get();
        $countTablesByStatus = $tables->groupBy('status')->map(fn($group) => $group->count())->toArray();
        $statuses            = array_column(TableStatus::cases(), 'value');
        return Inertia::render('orders/index', [
            'tables'              => $tables,
            'statuses'            => $statuses,
            'countTablesByStatus' => $countTablesByStatus,
        ]);
    }
}

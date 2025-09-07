<?php
namespace App\Http\Controllers;

use App\Enums\TableStatus;
use App\Models\Table;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function welcome()
    {
        $tables   = Table::select('id', 'name', 'status')->get();
        $statuses = array_column(TableStatus::cases(), 'value');
        return Inertia::render('welcome', [
            'tables'   => $tables,
            'statuses' => $statuses,
        ]);
    }
}

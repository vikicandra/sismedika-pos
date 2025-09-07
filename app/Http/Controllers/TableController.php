<?php
namespace App\Http\Controllers;

use App\Enums\TableStatus;
use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;
use App\Models\Table;
use Inertia\Inertia;

class TableController extends Controller
{
    public function index()
    {
        $tables = Table::all()->map(function ($table) {
            return [
                'id'         => $table->id,
                'name'       => $table->name,
                'status'     => $table->status,
                'created_at' => $table->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $table->updated_at->format('Y-m-d H:i:s'),
            ];
        });
        return Inertia::render('tables/index', [
            'tables' => $tables,
        ]);
    }

    public function create()
    {
        $statuses = array_column(TableStatus::cases(), 'value');
        return Inertia::render('tables/create', [
            'statuses' => $statuses,
        ]);
    }

    public function store(StoreTableRequest $request)
    {
        Table::create($request->validated());

        return to_route('tables.index')->with('message', 'Success');
    }

    public function edit(Table $table)
    {
        $statuses = array_column(TableStatus::cases(), 'value');
        return Inertia::render('tables/edit', [
            'table'    => [
                'id'     => $table->id,
                'name'   => $table->name,
                'status' => $table->status,
            ],
            'statuses' => $statuses,
        ]);
    }

    public function update(Table $table, UpdateTableRequest $request)
    {
        $validated = $request->validated();
        $table->update($validated);

        return to_route('tables.index')->with('message', 'Success');
    }

    public function destroy(Table $table)
    {
        // Add logic here to check if the table is occupied before deleting
        // For now, we'll just delete it.

        $table->delete();

        return redirect()->route('tables.index')->with('message', 'Table deleted successfully.');
    }

    public function floorPlan()
    {
        $tables              = Table::select('id', 'name', 'status')->get();
        $countTablesByStatus = $tables->groupBy('status')->map(fn($group) => $group->count())->toArray();
        $statuses            = array_column(TableStatus::cases(), 'value');
        return Inertia::render('tables/floor-plan', [
            'tables'              => $tables,
            'statuses'            => $statuses,
            'countTablesByStatus' => $countTablesByStatus,
        ]);
    }
}

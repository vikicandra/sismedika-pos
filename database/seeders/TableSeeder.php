<?php
namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Table::create(['name' => 'Table 1', 'status' => 'available']);
        Table::create(['name' => 'Table 2', 'status' => 'available']);
        Table::create(['name' => 'Table 3', 'status' => 'occupied']);
        Table::create(['name' => 'Table 4', 'status' => 'reserved']);
        Table::create(['name' => 'Table 5', 'status' => 'inactive']);
    }
}

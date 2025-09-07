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
        Table::create(['id' => '1', 'name' => '1', 'status' => 'available']);
        Table::create(['id' => '2', 'name' => '2', 'status' => 'available']);
        Table::create(['id' => '3', 'name' => '3', 'status' => 'available']);
        Table::create(['id' => '4', 'name' => '4', 'status' => 'available']);
        Table::create(['id' => '5', 'name' => '5', 'status' => 'available']);
        Table::create(['id' => '6', 'name' => '6', 'status' => 'available']);
        Table::create(['id' => '7', 'name' => '7', 'status' => 'available']);
        Table::create(['id' => '8', 'name' => '8', 'status' => 'available']);
        Table::create(['id' => '9', 'name' => '9', 'status' => 'available']);
        Table::create(['id' => '10', 'name' => '10', 'status' => 'available']);
        Table::create(['id' => '11', 'name' => '11', 'status' => 'available']);
        Table::create(['id' => '12', 'name' => '12', 'status' => 'available']);
        Table::create(['id' => '13', 'name' => '13', 'status' => 'available']);
        Table::create(['id' => '14', 'name' => '14', 'status' => 'available']);
        Table::create(['id' => '15', 'name' => '15', 'status' => 'occupied']);
        Table::create(['id' => '16', 'name' => '16', 'status' => 'occupied']);
        Table::create(['id' => '17', 'name' => '17', 'status' => 'occupied']);
        Table::create(['id' => '18', 'name' => '18', 'status' => 'occupied']);
        Table::create(['id' => '19', 'name' => '19', 'status' => 'occupied']);
        Table::create(['id' => '20', 'name' => '20', 'status' => 'occupied']);
        Table::create(['id' => '21', 'name' => '21', 'status' => 'available']);
        Table::create(['id' => '22', 'name' => '22', 'status' => 'available']);
        Table::create(['id' => '23', 'name' => '23', 'status' => 'reserved']);
        Table::create(['id' => '24', 'name' => '24', 'status' => 'inactive']);
    }
}

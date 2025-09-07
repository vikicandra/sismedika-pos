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
        Table::create(['name' => '1', 'status' => 'available']);
        Table::create(['name' => '2', 'status' => 'available']);
        Table::create(['name' => '3', 'status' => 'available']);
        Table::create(['name' => '4', 'status' => 'available']);
        Table::create(['name' => '5', 'status' => 'available']);
        Table::create(['name' => '6', 'status' => 'available']);
        Table::create(['name' => '7', 'status' => 'available']);
        Table::create(['name' => '8', 'status' => 'available']);
        Table::create(['name' => '9', 'status' => 'available']);
        Table::create(['name' => '10', 'status' => 'available']);
        Table::create(['name' => '11', 'status' => 'available']);
        Table::create(['name' => '12', 'status' => 'available']);
        Table::create(['name' => '13', 'status' => 'available']);
        Table::create(['name' => '14', 'status' => 'available']);
        Table::create(['name' => '15', 'status' => 'available']);
        Table::create(['name' => '16', 'status' => 'available']);
        Table::create(['name' => '17', 'status' => 'available']);
        Table::create(['name' => '18', 'status' => 'available']);
        Table::create(['name' => '19', 'status' => 'available']);
        Table::create(['name' => '20', 'status' => 'occupied']);
        Table::create(['name' => '21', 'status' => 'occupied']);
        Table::create(['name' => '22', 'status' => 'occupied']);
        Table::create(['name' => '23', 'status' => 'reserved']);
        Table::create(['name' => '24', 'status' => 'inactive']);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Fried Rice',
            'description' => 'Lorem ipsum',
            'price' => 15000,
            'product_category_id' => 1,
        ]);

        Product::create([
            'name' => 'Fried Chicken',
            'description' => 'Lorem ipsum',
            'price' => 10000,
            'product_category_id' => 1,
        ]);

        Product::create([
            'name' => 'French Fries',
            'description' => 'Lorem ipsum',
            'price' => 12000,
            'product_category_id' => 1,
        ]);

        Product::create([
            'name' => 'Fanta',
            'description' => 'Lorem ipsum',
            'price' => 5000,
            'product_category_id' => 2,
        ]);

        Product::create([
            'name' => 'Coca-Cola',
            'description' => 'Lorem ipsum',
            'price' => 5000,
            'product_category_id' => 2,
        ]);
    }
}

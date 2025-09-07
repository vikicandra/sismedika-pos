<?php
namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $order1 = Order::create([
            'table_id'      => 15,
            'user_id'       => 1,
            'customer_name' => 'Budi',
            'total_price'   => 10000,
            'status'        => 'open',
        ]);

        $order1->detail()->createMany([
            [
                'product_id' => 1,
                'quantity'   => 2,
                'price'      => 2000,
                'sub_total'  => 4000,
            ],
            [
                'product_id' => 2,
                'quantity'   => 3,
                'price'      => 1000,
                'sub_total'  => 3000,
            ],
            [
                'product_id' => 3,
                'quantity'   => 1,
                'price'      => 3000,
                'sub_total'  => 3000,
            ],
        ]);

        // -------------------------------

        $order2 = Order::create([
            'table_id'      => 16,
            'user_id'       => 1,
            'customer_name' => 'Carla',
            'total_price'   => 5000,
            'status'        => 'open',
        ]);

        $order2->detail()->createMany([
            [
                'product_id' => 1,
                'quantity'   => 2,
                'price'      => 2000,
                'sub_total'  => 4000,
            ],
            [
                'product_id' => 2,
                'quantity'   => 1,
                'price'      => 1000,
                'sub_total'  => 1000,
            ],
        ]);

        // -------------------------------

        $order3 = Order::create([
            'table_id'      => 17,
            'user_id'       => 1,
            'customer_name' => 'Jono',
            'total_price'   => 100000,
            'status'        => 'open',
        ]);

        $order3->detail()->createMany([
            [
                'product_id' => 1,
                'quantity'   => 2,
                'price'      => 20000,
                'sub_total'  => 40000,
            ],
            [
                'product_id' => 2,
                'quantity'   => 3,
                'price'      => 10000,
                'sub_total'  => 30000,
            ],
            [
                'product_id' => 3,
                'quantity'   => 1,
                'price'      => 30000,
                'sub_total'  => 30000,
            ],
        ]);

        // -------------------------------

        $order4 = Order::create([
            'table_id'      => 18,
            'user_id'       => 1,
            'customer_name' => 'Jono',
            'total_price'   => 100000,
            'status'        => 'cancelled',
        ]);

        $order4->detail()->createMany([
            [
                'product_id' => 1,
                'quantity'   => 2,
                'price'      => 20000,
                'sub_total'  => 40000,
            ],
            [
                'product_id' => 2,
                'quantity'   => 3,
                'price'      => 10000,
                'sub_total'  => 30000,
            ],
            [
                'product_id' => 3,
                'quantity'   => 1,
                'price'      => 30000,
                'sub_total'  => 30000,
            ],
        ]);

        // -------------------------------

        $order5 = Order::create([
            'table_id'      => 19,
            'user_id'       => 1,
            'customer_name' => 'Jono',
            'total_price'   => 100000,
            'status'        => 'closed',
        ]);

        $order5->detail()->createMany([
            [
                'product_id' => 1,
                'quantity'   => 2,
                'price'      => 20000,
                'sub_total'  => 40000,
            ],
            [
                'product_id' => 2,
                'quantity'   => 3,
                'price'      => 10000,
                'sub_total'  => 30000,
            ],
            [
                'product_id' => 3,
                'quantity'   => 1,
                'price'      => 30000,
                'sub_total'  => 30000,
            ],
        ]);

    }
}

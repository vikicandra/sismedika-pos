<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'cashier']);
        Role::create(['name' => 'waiter']);

        $user = User::create([
            'id'       => 1,
            'name'     => 'Admin',
            'email'    => 'admin@admin.com',
            'password' => Hash::make('12345678'),
        ]);
        $user->assignRole('admin');

        $cashier = User::create([
            'id'       => 2,
            'name'     => 'Cashier',
            'email'    => 'cashier@cashier.com',
            'password' => Hash::make('12345678'),
        ]);
        $cashier->assignRole('cashier');

        $waiter = User::create([
            'id'       => 3,
            'name'     => 'Waiter',
            'email'    => 'waiter@waiter.com',
            'password' => Hash::make('12345678'),
        ]);
        $waiter->assignRole('waiter');

    }
}

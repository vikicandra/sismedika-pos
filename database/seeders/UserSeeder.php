<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id'       => 1,
            'email'    => 'vikicandrata13@gmail.com',
            'password' => Hash::make('asdfasdf'),
        ]);
    }
}

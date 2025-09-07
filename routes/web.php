<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('product-categories', ProductCategoryController::class);
    Route::resource('products', ProductController::class);
    Route::get('tables/floor-plan', [TableController::class, 'floorPlan'])->name('tables.floor-plan');
    Route::resource('tables', TableController::class);
    Route::get('orders/cart/{table_id}', [OrderController::class, 'cart']);
    Route::resource('orders', OrderController::class);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

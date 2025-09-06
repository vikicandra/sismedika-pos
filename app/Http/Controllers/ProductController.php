<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')
            ->get()
            ->map(function ($product) {
                return [
                    'id'            => $product->id,
                    'name'          => $product->name,
                    'description'   => $product->description,
                    'price'         => $product->formatted_price,
                    'category_name' => $product->category->name,
                    'created_at'    => $product->created_at->format('Y-m-d H:i:s'),
                    'updated_at'    => $product->updated_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }
}

<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
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

    public function create()
    {
        $productCategories = ProductCategory::all();
        return Inertia::render('products/create', [
            'productCategories' => $productCategories,
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        Product::create($request->validated());

        return to_route('products.index')->with('message', 'Success');
    }

    public function edit(Product $product)
    {
        $productCategories = ProductCategory::all();
        return Inertia::render('products/edit', [
            'product'           => $product,
            'productCategories' => $productCategories,
        ]);
    }

    public function update(Product $product, StoreProductRequest $request)
    {
        $request->validated();
        $product->name                = $request->name;
        $product->description         = $request->description;
        $product->price               = $request->price;
        $product->product_category_id = $request->product_category_id;
        $product->save();

        return to_route('products.index')->with('message', 'Success');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}

<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Models\ProductCategory;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $productCategories = ProductCategory::all()->map(function ($productCategory) {
            return [
                'id'         => $productCategory->id,
                'name'       => $productCategory->name,
                'created_at' => $productCategory->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $productCategory->updated_at->format('Y-m-d H:i:s'),
            ];
        });
        return Inertia::render('product-categories/index', [
            'productCategories' => $productCategories,
        ]);
    }

    public function create()
    {
        return Inertia::render('product-categories/create');
    }

    public function store(StoreProductCategoryRequest $request)
    {
        ProductCategory::create($request->validated());

        return to_route('product-categories.index')->with('message', 'Success');
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('product-categories/edit', [
            'productCategory' => $productCategory,
        ]);
    }

    public function update(ProductCategory $productCategory, UpdateProductCategoryRequest $request)
    {
        $request->validated();
        $productCategory->name = $request->name;
        $productCategory->save();

        return to_route('product-categories.index')->with('message', 'Success');
    }

    public function destroy(ProductCategory $productCategory)
    {
        $productCategory->delete();

        return redirect()->route('product-categories.index');
    }
}

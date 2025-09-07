<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'sub_total',
        'notes',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

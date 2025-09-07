<?php
namespace App\Models;

use App\Policies\OrderPolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Model;

#[UsePolicy(OrderPolicy::class)]
class Order extends Model
{
    public $fillable = [
        'table_id',
        'user_id',
        'customer_name',
        'total_price',
        'status',
    ];

    public function detail()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

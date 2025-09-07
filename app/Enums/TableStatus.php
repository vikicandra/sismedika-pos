<?php
namespace App\Enums;

enum TableStatus: string {
    case AVAILABLE = 'available';
    case OCCUPIED  = 'occupied';
    case RESERVED  = 'reserved';
    case INACTIVE  = 'inactive';
}

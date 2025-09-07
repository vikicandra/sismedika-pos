<?php
namespace App\Enums;

enum OrderStatus: string {
    case OPEN      = 'open';
    case CLOSED    = 'closed';
    case CANCELLED = 'cancelled';
}

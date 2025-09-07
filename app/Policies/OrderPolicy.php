<?php
namespace App\Policies;

use App\Models\User;

class OrderPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return auth()->user()->hasRole(['admin', 'waiter']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return auth()->user()->hasRole(['admin', 'waiter']);
    }

    public function closeOrder(): bool
    {
        return auth()->user()->hasRole(['admin', 'waiter', 'cashier']);
    }
}

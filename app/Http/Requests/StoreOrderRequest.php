<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'table_id'      => ['required'],
            'total_price'   => ['required', 'numeric', 'min:1'],
            'customer_name' => ['required'],
            'items'         => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'total_price.min' => 'Please add item',
        ];
    }
}

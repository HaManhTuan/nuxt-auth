<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if (isset($this->id)) {
            return [
                'name'=> 'required',
                'email' => 'required|email|unique:users,email,'.$this->id. ',id,deleted_at,NULL',
                'age' => 'required',
                'gender' => 'required',
            ];
        } else {
            return [
                'name'=> 'required',
                'email' => ['required', 'email', 'unique:users'],
                'age' => 'required',
                'gender' => 'required',
            ];
        }
    }
}

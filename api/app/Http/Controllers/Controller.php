<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct()
    {
        $this->setModel();
    }
    abstract protected function setModel();

    public function responseSuccess($data, $message = null)
    {
        if ($message) {
            return response()->json(['success' => true, 'data' => $data, 'message' => $message], 200);
        }
        return response()->json(['success' => true, 'data' => $data], 200);
    }

    public function responseError($message, $status)
    {
        $status = $status ? $status : 500;
        return response()->json(['success' => false, 'message' => $message], $status);
    }
}

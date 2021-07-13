<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $request->getData();
            $credentials = [
                'name' => $data['username'],
                'password' => $data['password']
            ];
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'message' => 'Tài khoản hoặc mật khẩu sai'], Response::HTTP_BAD_REQUEST);
            } else {
                return response()->json(['success' => true, 'token' => $token], 200);
            }
            return response()->json(['success' => false, 'message' => 'Lỗi vui lòng thử lại'], Response::HTTP_BAD_REQUEST);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAuthenticatedUser() {
        $user = User::find(Auth::id());
        return $this->responseSuccess(['user' => $user]);
    }

    public function logout() {
        auth()->logout();
        return response()->json([], Response::HTTP_OK);
    }

    protected function setModel()
    {
        // TODO: Implement setModel() method.
    }
}

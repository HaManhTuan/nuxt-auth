<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class Jwtverify
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException){
                return response()->json(['message' => 'Token is Invalid'], Response::HTTP_UNAUTHORIZED);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['message' => 'Token is Expired'], Response::HTTP_UNAUTHORIZED);
            }else{
                return response()->json(['message' => 'Authorization Token not found'], Response::HTTP_UNAUTHORIZED);
            }
        }
        return $next($request);
    }
}

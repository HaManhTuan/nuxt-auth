<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/', function () {
    return 'OK-3000';
});

Route::group(['prefix' => 'auth', 'middleware' => 'api'], function () {
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['middleware' => ['jwt.authenticate']], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::get('current-user', [AuthController::class, 'getAuthenticatedUser']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
    Route::group(['prefix' => 'user'], function () {
        Route::get('/', [UserController::class, 'getAllUser']);
        Route::post('/', [UserController::class, 'createOrUpdateUser']);
        Route::get('/{id}', [UserController::class, 'getDetailUser']);
        Route::delete('/delete/{id}', [UserController::class, 'deleteUser']);
    });
});




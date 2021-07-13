<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @var User
     */
    private $model;

    protected function setModel()
    {
        $this->model = new User();
    }
    public function getAllUser(Request $request) {
        $users = $this->model->query();
        if($request->txtSearch) {
            $users = $this->model->query()->where('name', 'LIKE', '%' . $request->txtSearch . '%');
        } else {
            $users = $this->model->query();
        }
        $data = $this->getPaginateByQueryOrder($users, $request);
        return response()->json(['success' => true, 'data' => $data], 200);
    }

    public function getDetailUser($id) {
        $users = User::find($id);
        return response()->json(['success' => true, 'data' => $users], 200);
    }

    public function createOrUpdateUser(CreateUserRequest $request) {
        $input = $request->all();
        if (isset($input['id'])) {
            $user = User::find($input['id']);
            try {
                DB::beginTransaction();
                $user->update($input);
                DB::commit();
                // all good
            } catch (\Exception $e) {
                DB::rollback();
                return $this->responseError(__("Errors! Edit"), 400);
            }
            return $this->responseSuccess($user, __('Update successfully'));
        }
        try {
            DB::beginTransaction();
            $input['password'] = Hash::make('123456789');
            $user = User::query()->create($input);
            DB::commit();
            // all good
        } catch (\Exception $e) {
            DB::rollback();
            \Log::info($e->getMessage());
            return $this->responseError(__('Error !'), 400);
        }
        return $this->responseSuccess($user, __('Add successfully'));
    }

    public function deleteUser($id) {
        try {
            $user = User::where('id', $id)->delete();
            return $this->responseSuccess($user, __('Delete successfully'));
        } catch (\Exception $e) {
            DB::rollback();
            \Log::info($e->getMessage());
            return $this->responseError(__('Error !'), 400);
        }
    }

    public function getPaginateByQueryOrder($query, $request) {
        $without = ['orders', 'limit', 'offset'];
        $total = DB::connection('mysql')->query()->fromSub($query->cloneWithout($without), 'sub_table')->count();
        $currentPage = $request->current_page ? (int)$request->current_page : 1;
        $perPage = $request->per_page ? (int)$request->per_page : 2;
        if ($total == 0) {
            $lastPage = 1;
            $offSet = 0;
            $from = 0;
            $to = 0;
        } else {
            $lastPage = ceil($total / $perPage);
            $offSet = (($currentPage - 1) * $perPage);
            $from = $total ? ($offSet + 1) : 0;
            $to = $currentPage == $lastPage ? $total : ((($currentPage - 1) * $perPage) + $perPage);
        }
        $data = $query->orderBy('id', 'DESC')->offset($offSet ?: 0)->limit($perPage)->get();
        return [
            'data' => $data,
            'pagination' => [
                'current_page' => $currentPage,
                'from' => $from,
                'to' => $to,
                'last_page' => $lastPage,
                'per_page' => $perPage,
                'total' => $total
            ]
        ];
    }
}

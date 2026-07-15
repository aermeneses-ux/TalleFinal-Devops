<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index() {
        return User::all();
    }

    public function show($id) {
        return User::findOrFail($id);
    }

    public function store(Request $request) {
        return User::create($request->all());
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy($id) {
        User::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}

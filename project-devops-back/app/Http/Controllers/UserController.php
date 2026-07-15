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
        $data = $this->normalizeRequest($request->all());
        return User::create($data);
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $data = $this->normalizeRequest($request->all());
        $user->update($data);
        return $user;
    }

    public function destroy($id) {
        User::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    private function normalizeRequest(array $input): array
    {
        if (array_key_exists('birthDate', $input)) {
            $input['birth_date'] = $input['birthDate'];
            unset($input['birthDate']);
        }

        if (array_key_exists('contractType', $input)) {
            $input['contract_type'] = $input['contractType'];
            unset($input['contractType']);
        }

        return $input;
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    function register(Request $request) {

        $userExists = User::where('email', $request->email)->first();
        if ($userExists) return json_decode('{"error":"User Already Registerd"}');

        $user = new User();
        $user->name =  $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        return $user;
    }

    function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)){
            return json_decode('{"error":"Email & Password do not match"}');
        }
        return $user;
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Reservation;
use App\Models\Histrorique;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreateUserNotification;
use Illuminate\Hashing\BcryptHasher;
class UserController extends Controller
{
   
    
    
public function Create(Request $request){
  $email=User::where('Email',$request->Email)->first();
  if($email){
    return response()->json('Email Exist Already',400);
  }else{
    $request['api_token']=str_random(40);
    $request['Password']=app('hash')->make($request['Password']);
    $user= User::create($request->all());
    $history = new Histrorique;
    $user->notify(new CreateUserNotification($user));
  $user->save();
    $history->Etat = 'Active';
    $history->users_id= $user->id;
    $history->save();
    $client= User::find($user->id);
   $role=Role::find(1);  
   $client->assignRole($role->name);
    return response()->json($user);
    }
}
public function Update(Request $request, $id)
{ 
   $user= User::find($id);
   $user->Update ($request->all());
   return response()->json($user);
}
public function Show($id)
{
   $reservation = User::find($id);
   return response()->json($reservation);
}
public function Delete($id)
{
   $resevation = User::find($id);
   $resevation->delete();
    return response()->json('user est supprimer désoler pour notre service');
}
public function Banne(request $request,$id)
{
  $user=User::find($id);
  $email=$user->Email;
  $user->banne=$email;
  $user->Email="banned";
  $user->save();
  return response()->json('user has been banned');
}
public function DesBanne(request $request,$id)
{
  $user=User::find($id);
  $email=$user->banne;
  $user->banne="not banned";
  $user->Email=$email;
  $user->save();
  return response()->json('user has not banned');
}
public function ShowAll()
 {   
     $allUsers = User::all();
     return $allUsers;
} 
public function Logout($id)
 {   
     $User = User::find($id);
     $User->api_token=str_random(40);
     $User->save();
     return response()->json($User);
} 
public function isValid($api_token)
{
  $user=User::where('api_token',$api_token)->first();
  if($user and $user->role==2){
    return response()->json(true);
  }else{
    return response()->json(false);
  }
}

}

<?php

namespace App\Http\Controllers;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;
class RoleAuthorizationController extends Controller
{
 public function AffectRole(Request $REQUEST)
 {
   $user= User::find($REQUEST->user_id);
   $role=Role::find($REQUEST->role_id);  
   $user->assignRole($role->name);
 }   
 public function AffectPermission(Request $REQUEST)
 {
   $role= Role::find($REQUEST->role_id);  
   $permt= Permission::find($REQUEST->permission_id); 
   $role->givePermissionTo($permt->name);
 }
 public function DeleteRoleUser(Request $REQUEST)
 {
   $user= User::find($REQUEST->user_id);
   $role=Role::find($REQUEST->role_id); 
   $user->removeRole($role->name);  
 }
 public function DeletePermissionRole(Request $REQUEST)
 {
   $role= Role::find($REQUEST->user_id);
   $permt= Permission::find($REQUEST->permission_id);   
   $role->revokePermissionTo($permt->name);
 }

}
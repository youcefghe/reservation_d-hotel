<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('AviTab','ReservationController@create');
$router->get('userid','ReservationController@Userid');
 
    //  $router->group(['middleware' => ['role:client|recepionist|super admin']], function ($router) {
      
          $router->group(['prefix' => '/Reservation'],function ($router)
           {
			   $router->post('/ShowReser/{user_id}','ReservationController@ShowA');
           $router->post('/Create','Reservation_TableController@Create');
		    $router->post('/ShowAct','ReservationController@ShowActive');
           $router->get('/ShowAll/{users_id}','ReservationController@ShowAll');
           $router->put('/Update','ReservationController@Update');
           $router->get('/Show/{id}','ReservationController@Show');
           $router->delete('/DeleteRes/{id_reservation}','ReservationController@DeleteRes');
          
        });
          $router->group(['prefix' => '/Menu'],function ($router)
          {
           $router->post('/Create','Reservation_PlatController@Create');
           $router->post('/ShowAll','PlatController@ShowAll');
           $router->post('/Show/{id}','Reservation_PlatController@ShowMenu');
		   $router->put('/UpdatePl/{id}','PlatController@Update');
           $router->get('/rechercher/{id}','ReservationController@rechercher');
          
        });
  // });
     //$router->group(['middleware' => ['role:restaurant owner|super admin']], function ($router) {
        $router->group(['prefix' => '/Owner/Reservation'],function ($router)
        {
           $router->delete('/DeleteForDay/{date}','ReservationController@DeleteForDay');
           $router->get('/ShowForDay/{date}','ReservationController@ShowForDay');
           $router->post('/ShowAR','ReservationController@ShowAR');
           $router->post('/ShowAC','ReservationController@ShowAC');
		  
         });
        $router->group(['prefix' => '/Restaurant'],function ($router)
        {
           $router->post('/Create','RestaurantController@Create');
		   
           $router->get('/Show/{id}','RestaurantController@Show');
           $router->put('/Update/{id}','RestaurantController@Update');
           $router->put('/ChangeStatus','RestaurantController@ChangeEtat');
           $router->post('/ShowAll','RestaurantController@ShowAll');
        });
          //$router->delete('/DeleteTab/{id}','TableController@Delete');
         $router->group(['prefix' => '/Table'],function ($router)
         {
          $router->post('/Add','PlatController@Add');
           
           $router->put('/Update','PlatController@Change');
           $router->post('/Tab','PlatController@ShowAllTab');         
           $router->delete('/DeleteTab/{id}','PlatController@DeleteTab');
         });
         $router->group(['prefix' => '/Plat'],function ($router)
         {
            $router->post('/Create','PlatController@Create');
            $router->get('/ShowAll','PlatController@ShowAll');
            $router->put('/Update/{id}','PlatController@Update');
            $router->get('/Show/{id}','PlatController@Show');
            $router->delete('/Delete/{id}','PlatController@Delete');
        });
         $router->group(['prefix' => '/Vacance'],function ($router)
         {
            $router->post('/Create','VacanceController@Create');
            $router->post('/ShowAll','VacanceController@ShowAll');
            $router->put('/Update/{id}','VacanceController@Update');
            $router->get('/Show/{id}','VacanceController@Show');
            $router->delete('/Delete/{id}','VacanceController@Delete');
        });
         $router->group(['prefix' => '/Message'],function ($router)
         {
            $router->post('/Create','MessageController@Create');
            $router->post('/ShowAll','MessageController@ShowAll');
            $router->delete('/Delete/{id}','MessageController@Delete');
        });
         $router->group(['prefix' => '/Notification'],function ($router)
         {
            $router->post('/Create','NotificationController@Create');
            $router->post('/ShowAll','NotificationController@ShowAll');
            $router->delete('/Delete/{id}','NotificationController@Delete');
        });
   //  });
     $router->group(['prefix' => '/User'],function ($router)
     {
      //$router->group(['middleware' => ['role:admin|super admin']], function ($router)
        //{
            $router->post('/ShowAll','UserController@ShowAll');
            $router->delete('DeleteUse/{id}','UserController@Delete');
            $router->put('/Banne/{id}','UserController@Banne'); 
            $router->put('/DesBanne/{id}','UserController@DesBanne');
            $router->get('/isLogged/{api_token}','UserController@isValid'); 
      //});
       $router->post('/Create','UserController@Create');
     //  $router->group(['middleware' => ['role:client|super admin']], function ($router)
         $router->put('/Update/{id}','UserController@Update');
         $router->delete('/DeleteHstr/{users_id}','ReservationController@DeleteHistory');
         $router->get('/Show/{id}','UserController@Show');

          });
     //});
	 
    // $router->group(['middleware' => ['role:admin|super admin']], function ($router){
       
      $router->group(['prefix' => '/Calc'],function ($router)
      {
         $router->get('/Stat','StatisticsController@CalculAll');
      });
      $router->group(['prefix' => '/RolePer'],function ($router)
      {
        $router->post('/AffectRole','RoleAuthorizationController@AffectRole');
        $router->post('/AffectPermt','RoleAuthorizationControllerr@AffectPermission');
        $router->delete('/DeleteRolUsr','RoleAuthorizationController@DeleteRoleUser');
        $router->delete('/DeletePermtRol','RoleAuthorizationControllerr@DeletePermissionRole');
      });
   // });
    $router->get('/ShowAvilable','TableController@ShowAvilable');
    $router->post('/login','AuthentificationController@authenticate');
     $router->post('/Logout/{id}','UserController@Logout');    
   $router->group( ['middleware' => 'jwt.auth'], function() use ($router) {
            $router->get('/utils', function(Request $request){
                
                return response()->json($request->auth);
            });
    

});
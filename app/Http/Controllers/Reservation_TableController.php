<?php

namespace App\Http\Controllers;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\carbon;
use App\Models\Table;
use App\Models\Histrorique;
use App\Models\Reservation_Table;
use App\Models\Hitrorique_Reservation;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

use App\Notifications\CreateReservationNotification;
class Reservation_TableController extends Controller
{
   function __construct()
    {
        
   $this->middleware('auth', ['only' => ['Create']]);
   
    }
    public function Create(Request $request )
    {
      $restaurant=Restaurant::find(1);
      if($restaurant->Etat=='Active')
      {       
     $mon_a = new Carbon($request->HeureArrive);
     $now =Carbon::now();
     
     $h=new Carbon($request->HeureArrive);
     $h->subhour(2);
     $big_t= new Carbon($restaurant->HeureFerme);
     $big_t->subhour(3);
     $les_t= new Carbon($restaurant->HeureOuvert);
     $id=Auth::id();
     if($request->Type!='Commande')
        { 
         if($mon_a->hour >= $big_t->hour or ($mon_a->hour == $les_t->hour and $mon_a->minute < $les_t->minute) or $mon_a->hour < $les_t->hour){
              return response()->json('restaurant est fermer',400);      
        
          }
          else{
             $time='yes';
             $date='yes';
            $Res_tabs = Reservation_Table::where('tables_id',$request->tables_id)->get();
          foreach ($Res_tabs as $Res_tab)
          { 
                   $Reservation = Reservation::find($Res_tab->reservations_id);
                   $apre_date= new Carbon($Reservation->DateArrive);
                   $current_date= new Carbon($request->DateArrive);
                   if($current_date->equalTo($apre_date))
                   {                
                      $son_a = new Carbon($Reservation->HeureArrive);
                      $son_r =new Carbon($Res_tab->HeureRentrer);
                      $s=new Carbon($request->HeureArrive);
                      $mon_r = $s->addhour(3);
                      if($mon_a==$son_a or ($mon_a > $son_a  and $mon_a < $son_r) or ($mon_r > $son_a and $mon_r < $son_r ) )
                      {
                         $time='no';
                      }
                   }
          }  
          if($date=='yes')
          {
             if($time=='yes')
             {      
		  $historique=Histrorique::where('users_id',$id)->where('Etat','Active')->first();
            $resevation=Reservation::create(['Type' => $request->Type,'DateArrive' => $request->DateArrive,
           'HeureArrive' => $request->HeureArrive,'users_id' => $id,'restaurants_id' => $restaurant->id,'histroriques_id' => $historique->id]);
           $resevation->save();
           $temp=new carbon($request->HeureArrive);
           $temp->addhour(3);
           $lastidres= DB::table('reservations')->where('users_id',$id)->orderBy('created_at', 'desc')->first();//Reservation::where('users_id',$id)->orderby;

           $reservation=Reservation_Table::create(['reservations_id'=>$resevation->id,'tables_id'=>$request->tables_id,'HeureRentrer'=>$temp]);
           $reservation=Hitrorique_Reservation::create(['id'=>$resevation->id,'Type_Res' => $request->Type,'DateArrive_Res' => $request->DateArrive,'EtatR'=>'Active',
           'HeureArrive_Res' => $request->HeureArrive,'users_id' => $id,'restaurants_id' => $restaurant->id,'histroriques_id' => $historique->id,'tables_id'=>$request->tables_id]);  
              $user=User::find($id);
              $note="User ".$user->UserName." has Create bookin N= ".$lastidres->id." for table N= ".$request->tables_id;
              $notification=Notification::Create(['Notification'=>$note]);
             
               return response()->json($lastidres->id);
			  
             }else{
                return response()->json("Change le temp svp",400);  
             }
          }else{
             return response()->json('change la date svp',400);
          }
		   
         }
       }else{
         $big_t= new Carbon($restaurant->HeureFerme);
         $les_t= new Carbon($restaurant->HeureOuvert);
         $date = Carbon::now();
         if($date->hour >= $big_t->hour or ($date->hour == $les_t->hour and $date->minute < $les_t->minute) or $date->hour < $les_t->hour)
         {
            return response()->json('We are closed ',400);
         }else{
			 $historique=Histrorique::where('users_id',$id)->where('Etat','Active')->first();
             $resevation=Reservation::create(['Type' => $request->Type,'AddressComnd' => $request->AddressComnd,
           'users_id' => $id,'restaurants_id' => $restaurant->id,'histroriques_id' => $historique->id]);            
              $resevation->save();
             $reservation = Hitrorique_Reservation::create([
                 'id' => $resevation->id,
              'Type_Res'=>$request->Type,
               'restaurants_id' => $restaurant->id,
              'users_id'=>$id,
              'AddressC'=> $request->AddressComnd,
              'histroriques_id'=> $historique->id,
              'EtatR' => 'Active'
              ]);
               $user=User::find($id);
              
              $lastidres= DB::table('reservations')->where('users_id',$id)->orderBy('created_at', 'desc')->first();
               $note="User ".$user->UserName." has Create bookin N= ".$lastidres->id." for table N= ".$request->tables_id;
               $notification=Notification::Create(['Notification'=>$note]);
               //Reservation::where('users_id',$id)->orderby;

              return response()->json($lastidres->id);
          } 
       } 
   }else{
         return response()->json('restaurant est pas actif',400);
   }
} 
}
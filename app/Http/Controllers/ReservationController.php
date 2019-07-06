<?php

namespace App\Http\Controllers;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\carbon;
use App\Models\Table;
use Illuminate\Support\Facades\Auth;
use App\Models\Histrorique; 
use App\Models\Reservation_Table; 
use App\Models\Reservation_Plat;
use App\Models\Vacance;
use App\Models\Hitrorique_Reservation;

use App\User;
use Illuminate\Http\Request;
class ReservationController extends Controller
{
  public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['only' => ['ShowAll',
     'create','ShowActive','ShowAR','Update']]);
    }
	public function ShowA($user_id)
	{
	
		 $allReservations = '';
    $historique=Histrorique::where('Etat','=','Active')->where('users_id',$user_id)->first();
    if($historique)
    {
       $allReservations=Hitrorique_Reservation::where('users_id',$user_id)->where('histroriques_id',$historique->id)->where('EtatR','!=','Delete')->get();
    }
	 return response()->json($allReservations);
	}
	
 public function ShowAll($users_id)
 {   $allReservations = '';
    $historique=Histrorique::where('Etat','=','Active')->where('users_id',$users_id)->first();
    if($historique)
    {
       $allReservations=Hitrorique_Reservation::where('users_id',$users_id)->where('histroriques_id',$historique->id)->where('EtatR','!=','Delete')->get();
    }
 return $allReservations;
}
public function create(Request $request)
    {
        $collection=collect();
        $coll=collect();
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
          if($mon_a->hour > $big_t->hour  or $mon_a->hour < $les_t->hour){
               return response()->json('restaurant est fermer',400);      
          }else{ 
               $vacance=Vacance::where('Date',$request->DateArrive)->first();
              if($vacance)
              {
                    return response()->json("We Are On Holiday Change Date",400);
              }else{
                    $aujour=Carbon::today();
                    $mar=new Carbon($request->DateArrive);
                    $no=Carbon::now();
                    $no->addhour(2);
                    $mh=new Carbon($request->HeureArrive);
                    if(($aujour==$mar and $no>=$mh) or $aujour>$mar)
                    {
                       if($aujour>$mar)
                       {
                        return response()->json("Change date you can't booking less than date of today",400);
                       }else{
                        return response()->json("Change time you can't booking less than 2hour before your coming",400);
                       }
                       
                    }else{
                           $Tables = Table::where('CapaciteMax','>=',$request->PartySize)->where('CapaciteMini','<=',$request->PartySize)->get();
                           foreach($Tables as $Table)
                           {
                             $Res_tabs = Reservation_Table::where('tables_id',$Table->id)->get();
                             foreach ($Res_tabs as $Res_tab)
                             { 
                                 $Reservation = Reservation::find($Res_tab->reservations_id);
                                 $apre_date= new Carbon($Reservation->DateArrive);
                                 $current_date= new Carbon($request->DateArrive);
                                 if($current_date->equalTo($apre_date))//or $Reservation->EtatRes =='Desactive')
                                 {           
                                    $son_a = new Carbon($Reservation->HeureArrive);
                                    $son_r =new Carbon($Res_tab->HeureRentrer);
                                    $mon_a=new Carbon($request->HeureArrive);
                                    $s=new Carbon($request->HeureArrive);
                                    $mon_r = $s->addhour(3);
                                    if($mon_a==$son_a or ($mon_a > $son_a  and $mon_a < $son_r) or ($mon_r > $son_a and $mon_r < $son_r ) )
                                    {
                                         $collection->push($Table);
                                    }
                                  }
                             }
                           }   
                           foreach($Tables as $Table)
                          { 
                             $resp=$collection->contains('id', $Table->id);
                             if($resp==false)
                             {
                                 $coll->push($Table);
                             }
                          }           
        
                         return response()->json($coll);
                     }
                }
              }
         }else{
           return response()->json("We Are On Holiday Change Date",403);
         }     
    }
public function Show($id)
{

   $reservation = Reservation::find($id);
   return response()->json($reservation);

}
public function ShowActive()
{
	$id=Auth::id();
	$active=Reservation::where('users_id',$id)->get();
	return response()->json($active);
}

public function ShowForDay($date)
{
   $reservation=Reservation::whereDate('created_at',$date)->get();
   return response()->json($reservation);
}
public function ShowAR()
{
   $reservation=Reservation::where('Type','Reservation 2eme class')->orwhere('Type','Reservation 1ere class')->orwhere('Type','Reservation')->get();
   return response()->json($reservation);
}
public function ShowAC()
{
   $reservation=Reservation::where('Type','Commande')->get();
   return response()->json($reservation);
}
public function DeleteForDay($date)
{
   $reservations=Reservation::whereDate('created_at',$date)->get();
   foreach ($reservations as $res)
   {
      $drc=ReservationController::Delete($res->id,'delete');
   }
   return response()->json($reservations);
}
public function Update(Request $request)
{ 
   
   $restaurant=Restaurant::find(1);
   if($restaurant->Etat=='Active')
   {
	   $resevation= Reservation::find($request->id);
     if($resevation->Type!='Commande' and $request->Type!='Commande')
     {
  $mon_a = new Carbon($request->HeureArrive);
      $big_t= new Carbon($restaurant->HeureFerme);
      $big_t->subhour(3);
      $les_t= new Carbon($restaurant->HeureOuvert);
     //   if($mon_a >= $big_t->hour or ($mon_a->hour == $les_t->hour and $mon_a->minute < $les_t->minute) or $mon_a->hour < $les_t->hour){
       //     return response()->json('ferme');
       // }else{
        $temp=$request->HeureArrive;
         
					$Res_ta = Reservation_Table::where('tables_id',$request->tables_id)->where('reservations_id',$request->id)->first();
         $resevation->Update(['DateArrive' => $request->DateArrive,'HeureArrive' => $request->HeureArrive,'Type'=> $request->Type]);
         
          $relation= Reservation_Table::where('reservations_id',$request->id);      
          $temp=new Carbon($request->HeureArrive);
          $relation->Update(['tables_id' => $request->tables_id,'HeureRentrer'=> $temp->addhour(3) ]);
          $reservation=Hitrorique_Reservation::find($request->id);
          $reservation->Update(['tables_id' => $request->tables_id,'DateArrive_Res' => $request->DateArrive,'HeureArrive_Res' => $request->HeureArrive,'Type_Res'=> $request->Type]);    
                  return response()->json("Reservation Updated"); 
              }
     //  }     
       else{
         return response()->json('You Cant do that');
          }
   }else{
      return response()->json('pas actif ');
   }
   }
   


public function DeleteRes($id_reservation)
{
    $reservation = Reservation::find($id_reservation);
   if($reservation){
      $menus=Reservation_Plat::where('reservations_id',$id_reservation)->get();
    if($reservation->Type!='Commande')
      {
          $date = Carbon::today();
		  $today=new Carbon($reservation->DateArrive);
          if($today==$date)
          {
               return response()->json('You cant delete booking in coming day',400);
          }else{
               $historique = Hitrorique_Reservation::find($id_reservation);
              // if($statut=='Delete'){
               foreach($menus as $menu)
               {
                    $menu->Etat='Annuler';
                    $menu->save();
               }
                    $historique->EtatR='Annuler';
             //  }else{
               /*foreach($menus as $menu)
                  {
                      $menu->Etat='Exp';
                      $menu->save();
                  }   
                    $historique->EtatR='Exp';*/
                 //}
               $historique->save();
               $reservation->delete();
			   return response()->json($id_reservation);
           }
     }else{
		  return response()->json('You cant delete delivery',400);
          /* if($statut=='delete'){
               return response()->json('vous pouver pas annuler une commande');
           }else{
               $historique = Hitrorique_Reservation::find($id_reservation);
               $historique->EtatR='Exp';
               foreach($menus as $menu)
               {
                      $menu->Etat='Exp';
                      $menu->save();
               } 
               $reservation->delete();
                }*/
     }     
   }
 } 
 public function DeleteHistory($users_id)
 {
   $historique=Histrorique::where('users_id',$users_id)->where('Etat','Active')->first();
   $historique->Etat='Delete';
   $historique->save();
   $history = new Histrorique;
   $history->users_id= $users_id;
   $history->save();

 }
}


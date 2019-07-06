<?php

namespace App\Http\Controllers;
use App\Models\Plat;
use App\Models\Facture;
use App\Models\Reservation;
use Carbon\carbon;
use App\Models\Hitrorique_Reservation;
use App\Models\Restaurant;
use App\Models\Reservation_Plat;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class Reservation_PlatController extends Controller
{
    
    function __construct()
    {
        
   $this->middleware('auth', ['except' => ['ShowMenu']]);
   
    }
    public function Show()
    {
        $allPlats = Plat::all();
        return $allPlats;
    }
    public function Create(Request $REQUEST)
    {  
        $facture = new Facture;
        $prix=0;
      foreach($REQUEST->p as $plt)
        {
           $menu = Reservation_Plat::create(['reservations_id'=>$REQUEST->reservations_id,
			'plats_id'=>$plt['id'],'Quantite'=>$plt['Quantite'],
			'Etat'=>'Active']);
            $menu->reservations_id=$REQUEST->reservations_id;
            
            $pr=Plat::find($plt['id']);
            $prix=$prix+$pr->Prix;
            
            
            $menu->save();
        }
       $id=Auth::id();
        $rest=Restaurant::find(1);
        $today = Carbon::now();
        $count=0;
		
       if($rest->DateRedect <= $today and $rest->DateFRedect >= $today)
        {
             $resvts=Hitrorique_Reservation::where('users_id',$id)->where('EtatR','!=','Annuler')->get();
             foreach($resvts as $resvt)
             { 
                $mnth=new Carbon($resvt->created_at);
               $ant=new Carbon($rest->DateRedect);
               if($ant->month==$mnth->month)
               {
                   $count=$count+1;
                }  
             }
             if($count>=3)
             {
                 $prix=($prix*$rest->Redect)/100;
             }
        }
        $facture->user_id= $id;
        $facture->reservation_id=$REQUEST->reservations_id;
        $facture->prix=$prix;
        $facture->etat='not payed';
        $facture->save();
        return response()->json('date'); }
   
    public function ShowMenu(Request $REQUEST, $id)
    { 
                  $usermenu=collect();     
                  $plats=Plat::all();        
                  $menus= Reservation_Plat::where('reservations_id',$id)->get();
                  foreach($plats as $plat){
                     foreach($menus as $menu){
                       if($menu->plats_id==$plat->id){
                        $usermenu->push($plat);
                        break;
                       }
                     }
                   } 
                  return response()->json($usermenu);
            
    }
}
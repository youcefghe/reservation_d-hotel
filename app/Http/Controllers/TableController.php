<?php

namespace App\Http\Controllers;
use App\Models\Table;
use App\Models\Reservation_Table;
use App\Models\Reservation;
use Carbon\carbon;
use Illuminate\Http\Request;
class TableController extends Controller
{        
public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['except' => ['ShowAllTab']]);
    }
 public function create(Request $request)
    {
        $collection=collect();
        $coll=collect();
        $Tables = Table::where('Capacite',$request->PartySize)->get();
       foreach($Tables as $Table)
        {
            $Res_tabs = Reservation_Table::where('tables_id',"$Table->id")->get();
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
    public function ShowAllTab()
    {
        $Tables = Table::all();
        return response()->json($Tables);
    }
   /* public function Create(Request $REQUEST)
    {
        $table= Table::create($REQUEST->all());
        return response()->json("table est cree");
    }*/
/* public function Update(Request $request)
 {  
       $table= Table::find($request->tables_id);
       if($table)
       {
       $table->Update (['CapaciteMax'=>$request->CapaciteMax,
	                     'CapaciteMini'=>$request->CapaciteMini,
						 'Emplacement'=>$request->Emplacemt]);
       return response()->json($table);
       }
  }*/
  public function Delete($id)
  {
    $table= Table::find($id);
    return $id;
    //$table->delete();
    //return response()->json("table est supprimer");
  }
}     
<?php

namespace App\Http\Controllers;
use App\Models\Restaurant;
use Illuminate\Http\Request;
class RestaurantController extends Controller
{   
    public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['only' => ['ShowAll','Create','Update'
     ,'Show','ChangeEtat']]);
    }
    public function ShowAll()
    {
        $allRestaurants = Restaurant::all();
        return $allRestaurants;
    }
    public function Create(Request $REQUEST)
    {
        $Rest= Restaurant::create($REQUEST->all());
        return response()->json("plat est cree");
    }
    public function Update(Request $request, $id)
    { 
       $Rest= Restaurant::find($id);
       $Rest->Update (['HeureOuvert'=>$request->HeureOuvert,
                        'HeureFerme'=>$request->HeureFerme]);
       return response()->json("Time update successfuly");
    }
    public function Show($id)
    {
        $Rest= Restaurant::find($id);
        return $Rest;
    }
    /*public function Delete($id)
    {
        $Rest= Restaurant::find($id);
        $Rest->delete();
    }*/
     public function ChangeEtat(request $request)
    {
        $Rest= Restaurant::find(1);
        $Rest->Update (['Etat'=>$request->Etat]);
        return response()->json("Status Update Succefully");
    }

}
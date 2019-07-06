<?php

namespace App\Http\Controllers;
use App\Models\Vacance;
use Illuminate\Http\Request;

class VacanceController extends Controller
{
	public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['except' => ['Show','Delete']]);
    }
    public function Create(Request $request)
    {
    	$vacance=Vacance::Create(['Date'=>$request->Date]);
    	return response()->json("Vacance est ajouter");
    }
    public function Update(Request $request,$id)
    {
    	$vacance=Vacance::find($id);
    	$vacance->Update(['Date'=>$request->Date]);
    	return response()->json("Vacance est mise a jour");
    }
     public function Delete(Request $request,$id)
    {
    	$vacance=Vacance::find($id);
    	$vacance->Delete();
    	return response()->json("Vacance est Supprimer");
    }
     public function ShowAll(Request $request)
    {
    	$vacances=Vacance::all();
    	return response()->json($vacances);
    }
     public function Show(Request $request,$id)
    {
    	$vacance=Vacance::find($id);
    	return response()->json($vacance);
    }
}
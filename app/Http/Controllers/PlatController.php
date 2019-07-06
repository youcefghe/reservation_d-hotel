<?php

namespace App\Http\Controllers;
use App\Models\Plat;
use Illuminate\Http\Request;
use App\Models\Table;
class PlatController extends Controller
{
  public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['except' => ['ShowAll','Delete','DeleteTab']]);
    }
	public function Add(Request $request){
	$table=Table::Create(['Emplacement'=>$request->Emplacement,
	                        'CapaciteMax'=>$request->CapaciteMax,
							'CapaciteMini'=>$request->CapaciteMini]);
							return response()->json($table);
}
public function DeleteTab($id)
  {
    $table= Table::find($id);
    //return $id;
    $table->delete();
    return response()->json("table est supprimer");
  }
    public function ShowAll()
    {
        $allPlats = Plat::all();
        return response()->json($allPlats);
    }
    public function Create(Request $REQUEST)
    {
        $plat= Plat::create(['NomPlat'=>$REQUEST->NomPlat,
                          'Categore'=>$REQUEST->Categore,
              'Description'=>$REQUEST->Description,
             'Prix'=>$REQUEST->Prix]);
        return response()->json("plat est cree");
    }
	 public function ShowAllTab()
    {
        $Tables = Table::all();
        return response()->json($Tables);
    }
	public function Change(Request $request)
 {  
       $table= Table::find($request->tables_id);
       if($table)
       {
       $table->CapaciteMax=$request->CapaciteMax;
	   $table->CapaciteMini=$request->CapaciteMini;
	   $table->Emplacement=$request->Emplacement;
     $table->save();
       return response()->json($table);
       }
  }
    public function Update(Request $request,$id)
    { 
       $plat= Plat::find($id);
       $plat->Update (['NomPlat'=>$request->NomPlat,
	   'Description'=>$request->Description,
	   'Categore'=>$request->Categore,
	   'Prix'=>$request->Prix]);
       return response()->json("mise a jour est succes");
    }
    public function Show($id)
    {
        $plat= Plat::find($id);
        return $plat;
    }
    public function Delete($id)
    {
        $plat= Plat::find($id);
        $plat->delete();
        return response()->json("plat est annuler avec succes");
    }
}
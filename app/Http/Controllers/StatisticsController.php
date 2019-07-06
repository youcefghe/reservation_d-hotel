<?php

namespace App\Http\Controllers;
use App\Models\Reservation;
use App\Models\Restaurant;
use Carbon\carbon;
use App\Models\Table;
use App\Models\FActure;
use Illuminate\Support\Facades\Auth;
use App\Models\Histrorique; 
use App\Models\Reservation_Table; 
use App\Models\Reservation_Plat;
use App\Models\Hitrorique_Reservation;

use App\User;
use Illuminate\Http\Request;
class StatisticsController extends Controller
{
    public function CalculAll(Request $request)
	{
        $cont=0;
        $facture=0;
        $user=0;
        $allReservations = Reservation::all();
        foreach ($allReservations as $Reservation)
        {
              $cont++;
        }
        $allUsers = User::all();
        foreach ($allUsers as $User)
        {
              $user++;
        }
        $allfacture = Facture::where('etat','not payed')->get();
        foreach ($allfacture as $Facture)
        {
              $facture++;
        }
        return response()->json(['users'=>$user,'facture'=>$facture,'reservation'=>$cont]);
    }
}
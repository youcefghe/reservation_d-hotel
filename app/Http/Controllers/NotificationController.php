<?php

namespace App\Http\Controllers;
use App\Models\Plat;
use Illuminate\Http\Request;
use App\Models\Notification;
class NotificationController extends Controller
{
  public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['except' => ['ShowAll','Delete','Create']]);
    }
     public function Create(Request $REQUEST)
    {
        $message= Notification::Create(['Notification'=>$REQUEST->Notification]);
        return response()->json("Notification est envoyer");
    }
    public function Delete($id)
    {
        $message= Notification::find($id);
        $message->delete();
        return response()->json("Notification est Supprimer");
    }
     public function ShowAll()
    {
        $allMessages = Notification::all();
        return response()->json($allMessages);
    }
}
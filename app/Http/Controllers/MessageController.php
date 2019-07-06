<?php

namespace App\Http\Controllers;
use App\Models\Plat;
use Illuminate\Http\Request;
use App\Models\Message;
class MessageController extends Controller
{
  public function __construct(Request $request) {
      $this->request = $request;
   $this->middleware('auth', ['except' => ['ShowAll','Delete','Create']]);
    }
     public function Create(Request $REQUEST)
    {
        $message= Message::Create(['Name'=>$REQUEST->Name,
                          'Email'=>$REQUEST->Email,
              'Message'=>$REQUEST->Message]);
        return response()->json("Message est envoyer");
    }
    public function Delete($id)
    {
        $message= Message::find($id);
        $message->delete();
        return response()->json("Message est Supprimer");
    }
     public function ShowAll()
    {
        $allMessages = Message::all();
        return response()->json($allMessages);
    }
}
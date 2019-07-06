<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    //
    public function verifier(Request $request,$gool)
{
   $this->validate($this->request, [

      'emplacemnet'     => 'required',
   
      'capacite'  => 'required'
   
   ]);
     $table = Table::where('emplacemnet', $this->request->input('emlacemnet'));
     if($table)
     {
      $table = Table::where('capacite', $this->request->input('capacite'));
      if($table)
     {
      $table = Table::where('disponible', $this->request->input('staut'))->firset();
      if($table)
      { 
         $gool=$table;
          return true;
      }
      else{
         return false;
      }
     }
     }
    }
}

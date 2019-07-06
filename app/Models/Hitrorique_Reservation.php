<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Hitrorique_Reservation extends Model{
     protected $fiallable = ['id','Type_Res','DateArrive_Res','HeureArrive_Res','EtatR','AddressC'];
     protected $guarded=[];
     public static $rules = [

     ];
     

     }
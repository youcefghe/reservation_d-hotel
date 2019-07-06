<?php

namespace app\Models;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
 use Illuminate\Database\Eloquent\Model;
 class Reservation_Plat extends Model{
    protected $fiallable = ['reservations_id','plats_id','Quantite','Etat'];
    protected $guarded=[];
    protected $primaryKey = 'reservations_id';
     public static $rules = [

     ];
     public $timestamps = false;
   
     }
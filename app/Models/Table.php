<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Table extends Model{
     protected $fiallable = ['id','Emplacement','CapaciteMini','CapaciteMax','Etat'];
       protected $guarded=[];
     public static $rules = [

     ];
     public $timestamps = false;
     
     public function reservations()
     {
       return $this->BelongsToMany('App\Models\Reservation');
     }
    }
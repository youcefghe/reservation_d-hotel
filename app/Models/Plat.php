<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Plat extends Model{
    protected $fiallable = ['id','NomPlat','Description','Prix','Categore'];
    
   protected $guarded=[];
     public static $rules = [

     ];
     public $timestamps = false;
     public function reservations()
     {
       return $this->BelongsToMany('App\Models\Reservation');
     }
     }
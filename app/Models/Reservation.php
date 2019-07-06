<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Reservation extends Model{
     protected $fiallable = ['id','DateArrive','HeureArrive','EtatRes','Type','AddressComnd'];
     protected $guarded=[];
     
     public static $rules = [

     ];

     public function tables()
    {
        return $this->hasMany('App\Models\Table');
    } 
    public function users()
    {
        return $this->BelongsTo('App\Models\User');
    }
    public function plats()
     {
       return $this->hasMany('App\Models\Plat');
     }
     }
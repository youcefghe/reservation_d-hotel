<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Histrorique extends Model{
     protected $fiallable = ['id','DateHist','users_id'];
     protected $guarded=[];
     protected $primaryKey = 'id';
     public static $rules = [

     ];
     public $timestamps = false;
     
     public function users()
     {
       return $this->belongsTo('App\Models\User');
     }
     public function reservations()
     {
        return $this->hasMany('App\Models\Reservation');
     }
    
    }
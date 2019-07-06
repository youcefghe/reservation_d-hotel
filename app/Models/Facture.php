<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Facture extends Model{
     protected $fiallable = ['user_id','reservation_id','prix','etat'];
     protected $guarded=[];
     protected $primaryKey = 'user_id';
     public static $rules = [

     ];
     public $timestamps = false;
}
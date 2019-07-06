<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Reservation_Table extends Model{
    protected $fiallable = ['reservations_id','tables_id','HeureRentrer'];
    protected $guarded = [];
    protected $primaryKey = 'reservations_id';
     public static $rules = [

     ];
     public $timestamps = false;
   
     }
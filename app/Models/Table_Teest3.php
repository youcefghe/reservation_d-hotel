<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Table_Test3 extends Model{
     protected $fiallable = ['reservations_id','tables_id'];
    
     public static $rules = [

     ];
     public $timestamps = false;
   
     }
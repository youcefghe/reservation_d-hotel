<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Models;
 class Table extends Models{
     protected $fiallable = ['id','firsetname','lastname','phonenumber','address'];
 
     public static $rules = [

     ];
     public $timestamps = false;
     }
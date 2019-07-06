<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Vacance extends Model{
     protected $fiallable = ['Date','id'];
     protected $guarded=[];
     protected $primaryKey = 'id';
     public static $rules = [

     ];
     public $timestamps = false;
}
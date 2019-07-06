<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Notification extends Model{
     protected $fiallable = ['Notification','id'];
     protected $guarded=[];
     protected $primaryKey = 'id';
     public static $rules = [

     ];
     public $timestamps = false;
}
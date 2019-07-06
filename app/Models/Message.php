<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Message extends Model{
     protected $fiallable = ['Name','id','Email','Message'];
     protected $guarded=[];
     protected $primaryKey = 'id';
     public static $rules = [

     ];
     public $timestamps = false;
}
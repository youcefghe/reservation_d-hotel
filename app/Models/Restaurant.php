<?php

namespace app\Models;
 use Illuminate\Database\Eloquent\Model;
 class Restaurant extends Model{
     protected $fiallable = ['id','NomRestaurant','HeureFerme','HeureOuvert','Note','Chef','Localisation'];
     protected $guarded=[];
     public static $rules = [

     ];
     public $timestamps = false;
}
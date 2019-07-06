import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{api_token} from './../api_token'
import{plat} from './plat'
import{reservation} from './reseervation'
import{reservationcom} from './reservationcom'
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public dish;
public token;

public sandwich: Array<DataObject> = [];
public pizza: Array<DataObject> = [];
public salade: Array<DataObject> = [ ];
public pl: Array<DataObject> = [];
public boison: Array<DataObject> = [];

  constructor(private http:HttpClient,private route:Router) {$(document).ready(function () {
 
    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
      });
  
      $('.ckbox label').on('click', function () {
        $(this).toggleClass('selected');
      });
  
      $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
          $('.table tr').css('display', 'none');
          $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
          $('.table tr').css('display', 'none').fadeIn('slow');
        }
      });
     $('.ad').on('click', function () {
       
           console.log( '$(this).val');
           
        });

   });
   this.token=JSON.parse(localStorage.getItem('api_token'));
   const api=new api_token(this.token['api_token']);
  
   this.http.post('http://localhost:8000/Menu/ShowAll',api).subscribe((data: Array<DataObject>)=>{
   this.dish=data;  
   for(var i=0;i<=this.dish.length-1;i++)
   {
     if(this.dish[i]['Categore']=='Salade'){
       this.salade.push(this.dish[i]);
     }
     if(this.dish[i]['Categore']=='Boison'){
      this.boison.push(this.dish[i]);
    }
    if(this.dish[i]['Categore']=='Plat'){
      this.pl.push(this.dish[i]);
    }
    if(this.dish[i]['Categore']=='Sandwich'){
      this.sandwich.push(this.dish[i]);
    }
    if(this.dish[i]['Categore']=='Pizza'){
      this.pizza.push(this.dish[i]);
    }
   
   }
    })
  }
 
  public qunt= new Array();
  /*table(){
    var g=document.querySelector('quantb');
    console.log(g);
  }*/
  reserve(t){
    var plt = new Array();
    var token;
    var tak={
      reservations_id:null,
    };
    var book;
    var req={
      reservations_id:null,
      api_token:null,
      p:new Array(),
    }
    $('input[type=checkbox]:checked').each(function() {
       plt.push(new plat($(this).val(),$(this).parent().parent().siblings(":last").children(":last").val()));
   });
   token=JSON.parse(localStorage.getItem('api_token'));
   //book=JSON.parse(localStorage.getItem('idtable'));
   var res =JSON.parse(localStorage.getItem('reservation'));
  var b =new reservationcom(res['api_token'],JSON.parse(localStorage.getItem('type')),res['DateArrive'],res['HeureArrive'],res['tables_id'])
   return this.http.post('http://localhost:8000/Reservation/Create/',b).subscribe(
    data=>{
      console.log(data);
     tak.reservations_id=data
      localStorage.setItem('idres',JSON.stringify(tak))
      
      var jt=JSON.parse(localStorage.getItem('idres'));
      var reser=new reservation(jt['reservations_id'],token['api_token']
      );
      req.api_token=reser.api_toekn;
      req.reservations_id=reser.reservations_id;
      req.p=plt;
     
      // console.log(req.p);
      
      return this.http.post('http://localhost:8000/Menu/Create/',req).subscribe(
       data=>{
         alert('booking succes')
         this.route.navigate(['/user/userdash']);   },
       error=>console.log(error))},
      
    error=>console.log(error));
   
   //console.log(b);
  
  
   
  }
  ngOnInit() {
  }

}
interface DataObject {
  id: number;
  NomPlat: string;
  Description: string;
  Categore: string;
  Prix: number;
}

import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public booking ={
    PartySize:null,
    DateArrive:null,
    Type:null,
    HeureArrive:null, 
    api_token:null,
};   
public  api_token;  
public tables;
public reservation;
public reservations;
public id;
public erreur;
public date;
constructor(private http:HttpClient,
  private route:Router,private datePipe: DatePipe ) {

    $(document).ready(function(){
        $('.form-control').focusin(function(){
            $(this).css("border-color"," #FF6107");
            $(this).css("caret-color"," #FF6107");
        })
        $('.form-control').blur(function(){
            $(this).css("border-color"," #7d7d7d");
        })   
       
    })
   
    this.id=JSON.parse(localStorage.getItem('res-id'));
    this.api_token=JSON.parse(localStorage.getItem('api_token'));
    this.http.get('http://localhost:8000/Reservation/Show/'+this.id,this.api_token).subscribe(
      data=>{
        this.reservation=data;
        
        this.booking.Type=this.reservation['Type'];
        this.booking.HeureArrive=this.reservation['HeureArrive'];
        this.booking.DateArrive=this.reservation['DateArrive'];
  
      },
      error=>console.log(error)
    )

}
onBooking(bok:NgForm)
{ 
  this.date= this.datePipe.transform(bok.value.DateArrive,"yyyy-MM-dd");
this.booking.DateArrive=this.date;

this.booking.HeureArrive=bok.value.HeureArrive;

this.booking.Type=bok.value.Type;
this.booking.PartySize=bok.value.PartySize;
this.booking.api_token=JSON.parse(localStorage.getItem('api_token'));
localStorage.setItem('type',JSON.stringify(bok.value.Type));
this.http.post('http://localhost:8000/AviTab',this.booking,this.api_token).subscribe(
  data=>{
    this.tables=data;
    console.log(localStorage.getItem('type'));
    localStorage.setItem('reservation', JSON.stringify(this.booking));
   localStorage.setItem('tables', JSON.stringify(this.tables));

    this.route.navigate(['/editable'])
  },error=>{
         this.erreur=error.error;
      }

)


}
  ngOnInit() {
  }

}

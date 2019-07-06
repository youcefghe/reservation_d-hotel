import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {   
    public booking ={
        PartySize:null,
        DateArrive:null,
        Type:null,
        HeureArrive:null,
        FullName:null,
        api_token:null,
    }; 
    public date; 
    public erreur; 
    public  api_token;  
    public tables;
    constructor(private http:HttpClient,
      private route:Router,private datePipe: DatePipe ) {

        $(document).ready(function(){
            $('.form-control').focusin(function(){
                $(this).css("border-color"," #FF6107");
                $(this).css("caret-color"," #FF6107");
            })
            $('.form-control').blur(function(){
                $(this).css("border-color"," #7d7d7d");
                $(this).css("caret-color"," #7d7d7d");
            })   
         
        })
    
  }
  onBooking(bok:NgForm)
  { 
    this.booking.FullName=bok.value.FullName;
    this.booking.HeureArrive=bok.value.HeureArrive;
    this.date= this.datePipe.transform(bok.value.DateArrive,"yyyy-MM-dd");
    this.booking.DateArrive=this.date;
    this.booking.Type=bok.value.Type;
    this.booking.PartySize=bok.value.PartySize;
   this.booking.api_token=JSON.parse(localStorage.getItem('api_token'));
   localStorage.setItem('type',JSON.stringify(this.booking.Type));
   this.http.post('http://localhost:8000/AviTab',this.booking).subscribe(
      data=>{
        this.tables=data;
        
        localStorage.setItem('reservation', JSON.stringify(this.booking));
       localStorage.setItem('tables', JSON.stringify(this.tables));
    
        this.route.navigate(['/avitab'])
      },error=>{
         this.erreur=error.error;
      }
    )
    
    
  }
ngOnInit() {
}

}

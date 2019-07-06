import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-delivry',
  templateUrl: './delivry.component.html',
  styleUrls: ['./delivry.component.css']
})
export class DelivryComponent implements OnInit {
  public booking ={
    AddressComnd:null,
 
    Type:null,
    
    FullName:null,
};   
  constructor(private route:Router) {
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
  { this.booking.FullName=bok.value.FullName;
  
    this.booking.Type=bok.value.Type;
    this.booking.AddressComnd=bok.value.AddressComnd;
        localStorage.setItem('reservation', JSON.stringify(this.booking));
        this.route.navigate(['/delver'])
    
    
  }

  ngOnInit() {
  }

}

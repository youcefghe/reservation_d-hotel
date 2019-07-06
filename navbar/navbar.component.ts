import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  
  constructor() { 
    $(document).ready(function(){
      
      $(window).scroll(function(){
        var scroll =$(window).scrollTop();
        if(scroll>50){
          $('.navbar').css("background","rgba(0,0,0,0.7)");
        }else{
          $('.navbar').css("background","transparent");
        }
      })  
    })
  

     
    
;  }
  ngOnInit() {
  }
  

}

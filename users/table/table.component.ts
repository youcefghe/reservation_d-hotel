import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {login} from './../../login/login'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
 public table;
 public tabl;
 public book;
 public res={
   reservations_id:null,
 }
 public api_token;
 public reservation;
 public change;
  constructor(private http:HttpClient,private route:Router) { 
   this.table=localStorage.getItem('tables');
   this.tabl=JSON.parse(this.table);
   var limit = 1;
   $(document).ready(function(){
    $('input[type=checkbox]').on('change', function (e) {
      if ($('input[type=checkbox]:checked').length > 1) {
          $(this).prop('checked', false);
          alert("allowed only 1");
      }
  });
});
  
}
  ngOnInit() {
  }
  reserve(t){ 
    $('input[type=checkbox]').each(function() {
      if ($(this).is(":checked")) {
        t=$(this).val();     
      }
   });
   

   this.api_token=localStorage.getItem('api_token');
   this.reservation=localStorage.getItem('reservation');
   this.book=JSON.parse(this.api_token)
   this.change=JSON.parse(this.reservation);
   const booking = new login(this.change['DateArrive'],this.change['HeureArrive'],t,this.book['api_token'],this.book['Type']);
/*  this.book.DateArrive=this.reservation['DateArrive'];
  this.book.HeureArrive=this.reservation['HeureArrive'];
  this.book.tables_id=t;*/
  localStorage.setItem('reservation',JSON.stringify(booking));
  

      this.route.navigate(['/menu']);
   
   /* console.log(
      ));*/
  // console.log(booking,this.api_token);
  }

}

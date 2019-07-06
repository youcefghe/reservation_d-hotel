import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {login} from './../../login/login'
import{reservation} from './reservation'
@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit {
  public res={
    reservations_id:null,
  }
  public api_token;
  public reservation;
  public change;
  public table;
 public tabl;
 public book;
 public type;
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
 this.type=JSON.parse(localStorage.getItem('type'));
 const booking = new reservation(JSON.parse(localStorage.getItem('res-id')),this.change['DateArrive'],this.change['HeureArrive'],t,this.book['api_token'],this.type)
 
this.http.put('http://localhost:8000/Reservation/Update',booking).subscribe(
  data=>{
    console.log(data);
    alert('Booking update succefully')
    this.route.navigate(['user/reservation/edit'])
  },
  error=>console.log(error)
)

}
  ngOnInit() {
  }

}

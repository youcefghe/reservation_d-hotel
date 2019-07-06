import { Component, OnInit } from '@angular/core';
import{api_token} from './../api_token'
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{book} from './book'
import { reservation } from '../menu/reseervation';
@Component({
  selector: 'app-editbooking',
  templateUrl: './editbooking.component.html',
  styleUrls: ['./editbooking.component.css']
})
export class EditbookingComponent implements OnInit {
public token;
public d;
public erreur;
public reservations;
public dish: Array<DataObject> = [];
public reservation;
 
 constructor(private http:HttpClient,private route:Router) {
 

   }
   
   public id ;
   delete(ident) 
   {
    if (confirm('Are you sure you want to delet this booking?')) {
      this.http.delete('http://localhost:8000/Reservation/DeleteRes/'+ident,this.token).subscribe(
        data=>{
                    console.log(data);
        },
        error=>{
       this.erreur=error.error;
        }
      )
  } else {
      // Do nothing!
  }
  this.ngOnInit();
   }
   edit(id){
   
 this.id=id;
 localStorage.setItem('res-id',JSON.stringify(this.id));
      this.route.navigate(['/editbok']);
  }

  ngOnInit() {
    this.token=JSON.parse(localStorage.getItem('api_token'));
const api=new api_token(this.token['api_token']);
this.http.post('http://localhost:8000/Reservation/ShowAct',api).subscribe(
  data=>{ 
   localStorage.setItem('re',JSON.stringify(data));
   this.reservation=JSON.parse(localStorage.getItem('re'));

   //console.log(this.reservations)
  },
  error=>console.log(error)
);


  }

}
interface DataObject {
  id: number;
  DateArrive: string;
  HeureArrive: string;
  Type: string;
  
}
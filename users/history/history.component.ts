import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import {api_token} from './../api_token'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public api_token;
public user;
  public reservation;
  public reservations;
  public id;
  public Menu;
  constructor(private http:HttpClient,private route:Router) { 
    
    
  /* 
    );*/
    
  }
  public token;

  ngOnInit() {
    this.api_token=localStorage.getItem('api_token');
    const token= new api_token(this.api_token);
    //console.log(token.api_token)
  this.user=JSON.parse(localStorage.getItem('useracnt'));
  this.id=this.user['id'];
//console.log(this.id);
  this.http.post('http://localhost:8000/Reservation/ShowReser/'+this.id,this.api_token).subscribe(
  data=>{
        
       this.reservations=data;
        // this.reservation=JSON.parse(this.reservations);
         console.log(this.reservations);
      },
      error=>console.log(error)
    );
  
   //console.log(this.token.api_token)
  }
  ShowMenu(id){
  this.token=JSON.parse(localStorage.getItem('api_token'));
    const api=new api_token(this.token['api_token']);
    this.http.post('http://localhost:8000/Menu/Show/'+id,api).subscribe(
      data=>{ 
      this.Menu=data;
       //console.log(this.reservations)
      },
      error=>console.log(error)
    );
}

}
interface history{
  id:number,
  DateArrive_Res:string,
  HeureArrive_Res:string,
  Type_Res:string,
  Etat_Res:string,
  tables_id:number,
}

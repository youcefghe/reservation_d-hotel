import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{api_token} from './../../users/api_token';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-table-mang',
  templateUrl: './table-mang.component.html',
  styleUrls: ['./table-mang.component.css']
})
export class TableMangComponent implements OnInit {
public ident;
  public token;
  public table;
 public auth;
  public plat={
    //tables_id:null,
    CapaciteMini:null,
    CapaciteMax:null,
    Emplacement:null,
    api_token:null,
  }
  public tabledit={
    tables_id:null,
    CapaciteMini:null,
    CapaciteMax:null,
    Emplacement:null,
    api_token:null,
  }
  constructor(private http:HttpClient,private _route:Router) {
   
   }
ngOnInit() {
     this.token=JSON.parse(localStorage.getItem('api_token'));
     this.http.get('http://localhost:8000/User/isLogged/'+this.token['api_token']).subscribe(
    data=>{
      this.auth=data;
      if(this.auth==true)
      {
    const api=new api_token(this.token['api_token']);
    this.http.post('http://localhost:8000/Table/Tab',api).subscribe(data=>{
    this.table=data;
  console.log(data); }
   );}else{
     this._route.navigate(['/login']);
   }
  });
   
  }
  
  edit(id)
  {
  this.ident=id;
  }
  onCrDish(dis){
    this.plat.CapaciteMini=dis.value.CapaciteMini;
    this.plat.CapaciteMax=dis.value.CapaciteMax;
    this.plat.Emplacement=dis.value.Emplacement;
    this.plat.api_token=this.token['api_token'];
    this.http.post('http://localhost:8000/Table/Add',this.plat).subscribe(
      data=>{console.log(data);
        this.ngOnInit();

       // $('#myModal').modal('hide');
        },
      error=>console.log(error)
    );
  }
  onUpDish(etdis){
  this.tabledit.CapaciteMini=etdis.value.CapaciteMini;
    this.tabledit.CapaciteMax=etdis.value.CapaciteMax;
    this.tabledit.Emplacement=etdis.value.Emplacement;
    this.tabledit.tables_id=this.ident;
    this.tabledit.api_token=this.token['api_token'];
    this.http.put('http://localhost:8000/Table/Update',this.tabledit).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
  }
  dele()
  {
    this.http.delete('http://localhost:8000/Table/DeleteTab/'+this.ident,this.token).subscribe(
      data=>{console.log(data);
        this.ngOnInit();
         
        },
      error=>console.log(error)
    );
  }
 
  
  /* onUp(upd:NgForm){
    this.update.tables_id=this.ident;
    this.update.CapaciteMini=upd.value.CapaciteMini;
    this.update.CapaciteMax=upd.value.CapaciteMax;
    this.update.Emplacement=upd.value.Emplacement;
    this.token=JSON.parse(localStorage.getItem('api_token'));
   
  this.send(this.token,this.update);
   }
  send(t,d)
  {
    this.http.put('http://localhost:8000/Table/Update',d,t).subscribe(
     data=>{
       console.log(data);
     },
     error=>console.log(error)
   )
  }*/

}

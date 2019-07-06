import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{api_token} from './../../users/api_token';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-time-mang',
  templateUrl: './time-mang.component.html',
  styleUrls: ['./time-mang.component.css']
})
export class TimeMangComponent implements OnInit {
public ident;
  public token;
  public table;
  public t = {
  	api_token:null,
  	Etat:null,
  	 }
public auth;
  public vacance;
  public vac={
  	api_token:null,
    Date:null
  }
 public tabledit={
    HeureOuvert:null,
    HeureFerme:null,
    api_token:null,
  }
  constructor(private http:HttpClient,private datePipe: DatePipe,private _route:Router) { }

  ngOnInit() {
     this.token=JSON.parse(localStorage.getItem('api_token'));
     this.http.get('http://localhost:8000/User/isLogged/'+this.token['api_token']).subscribe(
    data=>{
      this.auth=data;
      if(this.auth==true)
      {
    const api=new api_token(this.token['api_token']);
    this.http.post('http://localhost:8000/Restaurant/ShowAll',api).subscribe(data=>{
    this.table=data;
     this.http.post('http://localhost:8000/Vacance/ShowAll',api).subscribe(data=>{
    this.vacance=data;
  console.log(data); }
   );
  console.log(data); }
   );}else{
    this._route.navigate(['/login']);
  }});
   
  }
  edit(id)
  {
  this.ident=id;
  }
  onCrDish(dis){

  	this.vac.Date= this.datePipe.transform(dis.value.Date,"yyyy-MM-dd");
    this.vac.api_token=this.token['api_token'];
    
     this.http.post('http://localhost:8000/Vacance/Create',this.vac).subscribe(data=>{
  console.log(data); 
this.ngOnInit();
}
   );
  }
  onUpHoliday(ethol){
    this.vac.Date= this.datePipe.transform(ethol.value.Date,"yyyy-MM-dd");
    this.vac.api_token=this.token['api_token'];  
      this.http.put('http://localhost:8000/Vacance/Update/'+this.ident,this.vac).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
}
active(){
    this.t.api_token =this.token['api_token'];
    this.t.Etat='Active';
  this.http.put('http://localhost:8000/Restaurant/ChangeStatus',this.t).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
}
desactive(){
	   this.t.api_token =this.token['api_token'];
    this.t.Etat='Desactive';
     this.http.put('http://localhost:8000/Restaurant/ChangeStatus',this.t).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
}

 dele()
  { 
  	this.t.api_token =this.token['api_token'];
    this.http.delete('http://localhost:8000/Vacance/Delete/'+this.ident,this.token).subscribe(
      data=>{console.log(data);
        this.ngOnInit();
         
        },
      error=>console.log(error)
    );
  }
  onUpDish(etdis){
  this.tabledit.HeureOuvert=etdis.value.HeureOuvert;
    
    this.tabledit.HeureFerme=etdis.value.HeureFerme;
    this.tabledit.api_token=this.token['api_token'];
    this.http.put('http://localhost:8000/Restaurant/Update/'+this.ident,this.tabledit).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
  }

}

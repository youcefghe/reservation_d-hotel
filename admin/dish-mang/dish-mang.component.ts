import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{api_token} from './../../users/api_token';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-dish-mang',
  templateUrl: './dish-mang.component.html',
  styleUrls: ['./dish-mang.component.css']
})
export class DishMangComponent implements OnInit {

public plat={
  NomPlat:null,
  Description:null,
  Categore:null,
  Prix:null,
  api_token:null,
} 
public auth;
  public ident;
  public token;
public dish;
  constructor(private http:HttpClient,private _route:Router) { 
    
  }
  edit(id)
  {
  this.ident=id;
  }
  onCrDish(dis){
    this.plat.NomPlat=dis.value.NomPlat;
    this.plat.Description=dis.value.Description;
    this.plat.Categore=dis.value.Categore;
    this.plat.Prix=dis.value.Prix;
    this.plat.api_token=this.token['api_token'];
    this.http.post('http://localhost:8000/Plat/Create',this.plat).subscribe(
      data=>{console.log(data);
        this.ngOnInit();

       // $('#myModal').modal('hide');
        },
      error=>console.log(error)
    );
  }
  onUpDish(etdis){
  this.plat.NomPlat=etdis.value.NomPlat;
    this.plat.Description=etdis.value.Description;
    this.plat.Categore=etdis.value.Categore;
    this.plat.Prix=etdis.value.Prix;
    this.plat.api_token=this.token['api_token'];
    this.http.put('http://localhost:8000/Menu/UpdatePl/'+this.ident,this.plat).subscribe(
      data=>{console.log(data);
        this.ngOnInit(); 
        },
      error=>console.log(error)
    );
  }
  dele()
  {
    this.http.delete('http://localhost:8000/Plat/Delete/'+this.ident,this.token).subscribe(
      data=>{console.log(data);
        this.ngOnInit();
         
        },
      error=>console.log(error)
    );
  }

  ngOnInit() {
    this.token=JSON.parse(localStorage.getItem('api_token'));
    this.http.get('http://localhost:8000/User/isLogged/'+this.token['api_token']).subscribe(
    data=>{
      this.auth=data;
      if(this.auth==true)
      {
    const api=new api_token(this.token['api_token']);
    this.http.post('http://localhost:8000/Menu/ShowAll',api).subscribe(data=>{
    this.dish=data;
  console.log(data); }
   ,error=>console.log(error)
   );
  }else{
    this._route.navigate(['/login']);
}
  }
  );
}

}

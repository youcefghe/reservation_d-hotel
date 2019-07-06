import { Component, OnInit } from '@angular/core';
import { NavbarComponent} from '../../navbar/navbar.component';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { $ } from 'protractor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   Navbar: NavbarComponent;
   show=false;
   public plat={
  Name:null,
  Email:null,
  Message:null,
  api_token:null,
} 
public user;
 public email;
 public number;
 public username;
 public Us={
  UserName:null,
  Email:null,
  PhoneNumber:null,
  api_token:null,
} 
public user_id;
  public ident;
  public token;
  toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
   
  }
  Logout(){
this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.user_id=this.user.id;
  this.http.post('http://localhost:8000/Logout/'+this.user_id,"hi").subscribe(
      data=>{console.log(data);
 localStorage.clear();
  this._route.navigate(['/']);
        },
      error=>console.log(error)
    );
  }
  constructor(private _route:Router,private http:HttpClient) {
  
  }
   SendM(dis){
    this.token=JSON.parse(localStorage.getItem('api_token'));
    this.plat.Name=dis.value.Name;
    this.plat.Email=dis.value.Email;
    this.plat.Message=dis.value.Message;
    this.plat.api_token=this.token['api_token'];
    this.http.post('http://localhost:8000/Message/Create',this.plat).subscribe(
      data=>{console.log(data);
       

       // $('#myModal').modal('hide');
        },
      error=>console.log(error)
    );
   }
   profile()
  {
    var ac;
    this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.username=this.user.UserName;
    this.email=this.user.Email;
    this.number=this.user.PhoneNumber;

  }
  SendU(dish){
    this.token=JSON.parse(localStorage.getItem('api_token'));
    this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.user_id=this.user.id;
    this.Us.UserName=dish.value.UserName;
    this.Us.Email=dish.value.Email;
    this.Us.PhoneNumber=dish.value.PhoneNumber;
    this.Us.api_token=this.token['api_token'];
    this.http.put('http://localhost:8000/User/Update/'+this.user_id,this.Us).subscribe(
      data=>{console.log(data);
       

       // $('#myModal').modal('hide');
        },
      error=>console.log(error)
    );
   }

  ngOnInit() {
    
  }

}

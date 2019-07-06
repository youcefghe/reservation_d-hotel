import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './../../../auth.guard';
@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
 public user;
 public email;
 public number;
 public username;
 public auth;
 public plat={
  UserName:null,
  Email:null,
  PhoneNumber:null,
  api_token:null,
} 
public user_id;
 public token;
  constructor(private _route:Router,private http:HttpClient,private adminGuard: AuthGuard) { 
    this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.username=this.user.UserName;
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
  ngOnInit() { 
  }
  profile()
  {
    var ac;
    this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.username=this.user.UserName;
    this.email=this.user.Email;
    this.number=this.user.PhoneNumber;

  }
  SendM(dis){
    this.token=JSON.parse(localStorage.getItem('api_token'));
    this.user=JSON.parse(localStorage.getItem('useracnt'));
    this.user_id=this.user.id;
    this.plat.UserName=dis.value.UserName;
    this.plat.Email=dis.value.Email;
    this.plat.PhoneNumber=dis.value.PhoneNumber;
    this.plat.api_token=this.token['api_token'];
    this.http.put('http://localhost:8000/User/Update/'+this.user_id,this.plat).subscribe(
      data=>{console.log(data);
       

       // $('#myModal').modal('hide');
        },
      error=>console.log(error)
    );
   }
}

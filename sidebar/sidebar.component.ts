import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
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
  constructor(private _route:Router,private http:HttpClient) { }
  toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
   
  }
  ngOnInit() {
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

}

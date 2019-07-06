import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public erreur ;

  constructor(
      private http:HttpClient, private _router:Router) {}

  ngOnInit() {
   
  }
 public api_token={
   api_token:null,
 }; 
 public role;
 public info={
   id:null,
   UserName:null,
   Address:null,
   Email:null,
   PhoneNumber:null,
 }
public user =
{
  Email:null,
  Password:null
}
  onLogin(log:NgForm) {
  this.user.Email=log.value.Email;
  this.user.Password=log.value.Password;
     this.http.post('http://localhost:8000/login', this.user
    ).subscribe(data => {
      this.role=data['roles'];
      this.info.id=data['user']['id'];
      this.info.UserName=data['user']['UserName'];
      this.info.Address=data['user']['address'];
      this.info.Email=data['user']['Email'];
      this.info.PhoneNumber=data['user']['PhoneNumber'];
      this.api_token.api_token=data['user']['api_token'];
     localStorage.setItem('api_token', JSON.stringify(this.api_token));
     localStorage.setItem('useracnt', JSON.stringify(this.info));
     localStorage.setItem('role', JSON.stringify(this.role));
     if(this.role==1)
     {
       this._router.navigate(['/user/userdash']);
     }else{
      this._router.navigate(['/admindash'])
     }
     
     // console.log(this.api_token,this.info,this.role);
    },error=> {
      this.erreur=error.error.error;
    }
    )        
  }
  
}

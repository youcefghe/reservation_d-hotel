import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { JwtService } from '../../services/jwt.service';
import { userInfo } from 'os';
import { url } from 'inspector';
import {  Router } from '@angular/router';


//import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 public erreur;
  constructor(private jwtservice :JwtService
   , private _router:Router) { }
  onSignUp(form:NgForm ){
   
       this.jwtservice.SignUp(form.value.UserName,form.value.Email,form.value.Password,form.value.Address,form.value.PhoneNumber).subscribe(
         Response=>{this._router.navigate(['/login'])},
         error =>{
          this.erreur=error.error;
         } 
       );
  }
  ngOnInit() {
  }

}

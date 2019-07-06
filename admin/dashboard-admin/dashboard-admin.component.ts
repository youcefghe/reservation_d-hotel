import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{api_token} from './../../users/api_token';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
public api_token;
public util;
public token;
public facture;
public reser;
public Message;
public Notification;
public auth;
  constructor(private http:HttpClient, private _router:Router) {
    this.api_token=localStorage.getItem('api_token'); 
   this.http.get('http://localhost:8000/Calc/Stat',this.api_token).subscribe(
  data=>{
    this.util=data['users'];
    this.facture=data['facture'];
    this.reser=data['reservation'];
  
  },
  error=>console.log(error)
   );
  }
delete(ident)
  {
    this.http.delete('http://localhost:8000/Message/Delete/'+ident,this.token).subscribe(
      data=>{console.log(data);
        this.ngOnInit();
         
        },
      error=>console.log(error)
    );
  }
  dele(ident)
  {
    this.http.delete('http://localhost:8000/Notification/Delete/'+ident,this.token).subscribe(
      data=>{console.log(data);
        this.ngOnInit();
         
        },
      error=>console.log(error)
    );
  }
  ngOnInit() {
    this.token=JSON.parse(localStorage.getItem('api_token'));
    const api=new api_token(this.token['api_token']);
    this.http.get('http://localhost:8000/User/isLogged/'+this.token['api_token']).subscribe(
      data=>{
        this.auth=data;
        if(this.auth==true)
        {
    this.http.post('http://localhost:8000/Message/ShowAll',api).subscribe(data=>{
    this.Message=data;
  console.log(data);
  this.http.post('http://localhost:8000/Notification/ShowAll',api).subscribe(data=>{
    this.Notification=data;
  console.log(data); }
   ,error=>console.log(error)
   ); }
   ,error=>console.log(error)
   );
  }else{
    this._router.navigate(['/login']);
}
});
  }
}

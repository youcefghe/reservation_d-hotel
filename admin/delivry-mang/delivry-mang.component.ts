import { Component, OnInit } from '@angular/core';
import{api_token} from './../../users/api_token'
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-delivry-mang',
  templateUrl: './delivry-mang.component.html',
  styleUrls: ['./delivry-mang.component.css']
})
export class DelivryMangComponent implements OnInit {

  constructor(private http:HttpClient,private _route:Router) { }
public reservation;
public token;
public Menu;
public auth;
ngOnInit() {
    this.token=JSON.parse(localStorage.getItem('api_token'));
    this.http.get('http://localhost:8000/User/isLogged/'+this.token['api_token']).subscribe(
      data=>{
        this.auth=data;
        if(this.auth==true)
        {
          
    const api=new api_token(this.token['api_token']);
    this.http.post('http://localhost:8000/Owner/Reservation/ShowAC',api).subscribe(
      data=>{ 
       localStorage.setItem('re',JSON.stringify(data));
       this.reservation=JSON.parse(localStorage.getItem('re'));
    
       //console.log(this.reservations)
      },
      error=>console.log(error)
    );

  }else{
    this._route.navigate(['/login']);
}
});
}

delete(ident) 
{
 if (confirm('Are you sure you want to delet this booking?')) {
   this.http.delete('http://localhost:8000/Reservation/DeleteRes/'+ident,this.token).subscribe(
     data=>{
                alert('booking delete succefully');
                this.ngOnInit();
     },
     error=>console.log(error)
   )
} else {
   // Do nothing!
}
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

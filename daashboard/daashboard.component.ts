import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-daashboard',
  templateUrl: './daashboard.component.html',
  styleUrls: ['./daashboard.component.css']
})
export class DaashboardComponent implements OnInit {


  constructor(private _router:Router,private http:HttpClient) {
  
   
   }
  

  ngOnInit() {
  }
   
}

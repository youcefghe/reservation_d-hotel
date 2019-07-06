import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
@Component({
  selector: 'app-newone',
  templateUrl: './newone.component.html',
  styleUrls: ['./newone.component.css']
})
export class NewoneComponent implements OnInit {
 personne:Personnes;
 user:Personnes[];

  constructor() { 
 
}
  ngOnInit() {
  }

}
interface Personnes{
  
  name:string,
  email:string,
  username:string
}
/* name='Mosbah';
  lname='Faysal Zine El Abddin'
  age=4;
  Me = {name:'Mosbah',lname:'Mohammed Haida',age:20};*/
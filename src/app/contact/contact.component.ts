import { Component, OnInit } from '@angular/core';
import { Contactus } from '../class/contactus';
import { LoginService } from '../services/login.service';
import { error } from 'protractor';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private _LoginService:LoginService) { }
  contactModel = new Contactus("","","")
  ngOnInit() {
  }
  onSubmit(){

this._LoginService.contactus(this.contactModel).subscribe(

response =>console.log(response),
error=>console.log(error)

)



  }
}

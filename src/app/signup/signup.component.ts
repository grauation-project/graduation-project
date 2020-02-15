import { Component, OnInit } from "@angular/core";
import { VolunteersignupService } from '../services/volunteersignup.service';

import { CharityService } from '../services/charity.service';
import { Volunteer } from '../class/volunteer';
import { Signup } from '../class/signup';



@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private charityserve:CharityService ,private volunteerservices:VolunteersignupService ) {};
  
  volunteersignup=new Volunteer("","","","",0,0,"","");

  
  charitymodel= new Signup("","","","",0,"","","","");
  ischarity = true;
  isvolunteer = false;
  ngOnInit() {}
  charityregister() {
    this.ischarity = true;
    this.isvolunteer = false;
  }
  volunregister() {
    this.ischarity = false;
    this.isvolunteer = true;
  }
  onSubmit(){
    console.log(this.charitymodel)
    this.charityserve.signUpCharity(this.charitymodel).subscribe(
      response => console.log('Success!', response),
      
      error => console.log('error',error)
      )
  }


  onSubmitvolunteer(){
    this.volunteerservices.volunteersign(this.volunteersignup).subscribe(
      response => console.log('Success!', response),
      error => console.log('error',error)
      )
  }
}

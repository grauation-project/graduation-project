import { Component, OnInit } from "@angular/core";
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Signup } from '../signup';
import { Volunteer } from '../volunteer';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private volunteerservices:VolunteersignupService) {}
  volunteersignup=new Volunteer("","","","",0,0,"","");

  
  charitymodel= new Signup("","","","",0,"","",0,"");
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
  onSubmitvolunteer(){
    this.volunteerservices.volunteersignup(this.volunteersignup).subscribe(
      response => console.log('Success!', response),
      error => console.log('error',error)
      )
  }
}

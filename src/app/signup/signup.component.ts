import { Component, OnInit } from "@angular/core";
import { Signup } from '../signup';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor() {}
  
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
}

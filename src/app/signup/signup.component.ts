import { Component, OnInit } from "@angular/core";
import { VolunteersignupService } from '../services/volunteersignup.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private volunteerservices:VolunteersignupService) {}
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

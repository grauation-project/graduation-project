import { Component, OnInit } from "@angular/core";
import { Signup } from '../signup';
import { CharityService } from '../services/charity.service';


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private charityserve:CharityService ) {}
  
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
  onSubmit(){
    console.log(this.charitymodel)
    this.charityserve.signUpCharity(this.charitymodel).subscribe(
      response => console.log('Success!', response),
      
      error => console.log('error',error)
      )
  }


}

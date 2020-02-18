import { Component, OnInit } from "@angular/core";
import { VolunteersignupService } from "../services/volunteersignup.service";
import { Signup } from "../signup";
import { CharityService } from "../services/charity.service";
import { Router } from "@angular/router";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";

import { Volunteer } from "../volunteer";
const URL = "http://localhost:3000/savethem/volunteer/signup";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [VolunteersignupService]
})
export class SignupComponent implements OnInit {
  // title = "ng8fileuploadexample";
  title = "ng8fileupload";
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "img"
  });
  constructor(
    private charityserve: CharityService,
    private volunteerservices: VolunteersignupService,
    private router: Router
  ) {}
  charityerror = "";
  volunteererror = "";
  fileselected = "";
  charitymodel = new Signup("", "", "", "", "", "", "", "");
  ischarity = true;
  isvolunteer = false;
  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log("ImageUpload:uploaded:", item.file);
      alert("File uploaded successfully");
    };
    console.log(this.uploader);
  }
  // onfileselected(event) {
  //   fileselected = event.target.files[0].name;
  // }
  volunteersignup = new Volunteer("", "", "", "", "", "", "", "");

  charityregister() {
    this.ischarity = true;
    this.isvolunteer = false;
  }
  volunregister() {
    this.ischarity = false;
    this.isvolunteer = true;
  }
  onSubmit() {
    console.log(this.charitymodel);
    this.charityserve.signUpCharity(this.charitymodel).subscribe(
      response => {
        console.log("Success!", response);
        this.router.navigate(["login"]);
      },

      error => {
        console.log("error", error);
        this.charityerror = error.error;

        this.router.navigate(["signup"]);
      }
    );
  }

  onSubmitvolunteer() {
    console.log(this.volunteersignup);

    this.volunteerservices.volunteersign(this.volunteersignup).subscribe(
      response => {
        console.log("Success!", response);
        this.router.navigate(["login"]);
      },

      error => {
        console.log("error", error);
        this.volunteererror = error.error;

        this.router.navigate(["signup"]);
      }
    );
  }
}

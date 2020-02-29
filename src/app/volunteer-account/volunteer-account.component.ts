import { Component, OnInit } from "@angular/core";
declare var require: any;
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
declare var require: any;
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Volunteer } from '../class/volunteer';
const URL = "http://localhost:3000/savethem/volunteer/signup";

@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "img"
  });
  imgprofile = require("../../assets/3.jpg");
  coverimmg=""
  imgnav = require("../../assets/1.jpg");
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "","");
  volunteersignup = new Volunteer("", "", "", "", "", "", "","");

  public code;
  public ID;

  title = 'Angular Search Using ng2-search-filter';
  searchText;
  listvolunteersearch ;
  listcharitysearch ;
  // slsText;
displaydiv = false;
  profileimageee="";
searcheng(){
  this.displaydiv = true;
}
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService

  ) {}
  fileselected = "";
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.volunteerdetails(this.code).subscribe(
      data => {
        this.volunteerdetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.volunteerdetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
        console.log(this.volunteerdetaile);
      },
      error => {
        console.log(error);
        this.router.navigate(["login"]);
      }
    );
     // subscribe search
     this.charityService.listCharity().subscribe(data=>{
      this.listcharitysearch=data
    });
    this.volunteerService.listvolunteer().subscribe(data=>{
      this.listvolunteersearch=data
    })
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  onfileselected(event) {
    this.fileselected = event.target.files[0].name;
    console.log( this.fileselected );
    this.coverimmg= require("../../../server/upload/"+this.fileselected)

  }
  
  govolunteer(volunteer){
    console.log(volunteer);
    this.router.navigate(['home/volunteer/'+volunteer._id+'/volunteer/account']);
    
  }
  gocharity(charity){
    console.log(charity);
    this.router.navigate(['home/charity/'+charity._id+'/charity/account']);
  }
  // coverimg(){

  //   console.log(this.volunteersignup.coverimg);

  //   this.volunteerService.volunteersign(this.volunteersignup.coverimg).subscribe(
  //     response => {
  //       console.log("Success!", response);
  //     },

  //     error => {
  //       console.log("error", error);
        
  //     }
  //   );
  // }
 
}

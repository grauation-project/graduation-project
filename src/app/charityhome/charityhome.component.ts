import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Signup } from "../class/signup";
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { AdminService } from '../services/admin.service';
declare var require: any;

@Component({
  selector: "app-charityhome",
  templateUrl: "./charityhome.component.html",
  styleUrls: ["./charityhome.component.css"]
})
export class CharityhomeComponent implements OnInit {
  profileimageee="";
  profileimag=""
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService,
    private _AdminService : AdminService

  ) {}
  public code;
  public ID;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");

  searchText;
  listvolunteersearch ;
  listcharitysearch ;
  // slsText;
displaydiv = false;
searcheng(){
  this.displaydiv = true;
}
charitydetails:any= new Signup("", "", "", "", "", "", "", "");

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.charitydetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
        console.log(this.charitydetaile);
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
  });
  this._AdminService.getcharities().subscribe(
    data  => {
      this.charitydetails = data;
  

      
      console.log(this.charitydetails);

    },

    error => {
      console.log("error", error);

    }
  )
  }
  refresh() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.ID = this.code.slice(0, 9);
        console.log(this.charitydetaile);
      },
      error => {
        console.log(error);
        this.router.navigate(["login"]);
      }
    );
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  govolunteer(volunteer){
    console.log(volunteer);
    this.router.navigate(['home/volunteer/'+volunteer._id+'/volunteer/account']);
    
  }
  gocharity(charity){
    console.log(charity);
    this.router.navigate(['home/charity/'+charity._id+'/charity/account']);
  }
 
}

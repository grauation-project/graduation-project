import { Component, OnInit } from "@angular/core";
declare var require: any;
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  imgprofile = require("../../assets/3.jpg");
  imgnav = require("../../assets/1.jpg");
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "");
  public code;
  public ID;

  title = 'Angular Search Using ng2-search-filter';
  searchText;
  listvolunteersearch ;
  listcharitysearch ;
  // slsText;
displaydiv = false;
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

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.volunteerdetails(this.code).subscribe(
      data => {
        this.volunteerdetaile = data;
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
  
 
}

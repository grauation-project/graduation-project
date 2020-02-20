import { Component, OnInit } from "@angular/core";
declare var require: any;
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
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
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
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
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  searchs = [
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
displaydiv = false;
searcheng(){
  this.displaydiv = true;
}
 
}

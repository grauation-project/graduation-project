import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Signup } from "src/app/class/signup";
import { LoginService } from "src/app/services/login.service";
import { CharityService } from 'src/app/services/charity.service';
import { VolunteersignupService } from 'src/app/services/volunteersignup.service';
@Component({
  selector: "app-charity-account",
  templateUrl: "./charity-account.component.html",
  styleUrls: ["./charity-account.component.css"]
})
export class CharityAccountComponent implements OnInit {
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService,

  ) {}
  public code;
  public ID;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
    title = 'Angular Search Using ng2-search-filter';
    searchText;
    listvolunteersearch ;
    listcharitysearch ;
    // slsText;
  displaydiv = false;
  searcheng(){
    this.displaydiv = true;
  }

  ngOnInit() {
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

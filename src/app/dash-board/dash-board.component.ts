import { Component, OnInit } from "@angular/core";
import { Login } from "../class/login";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  constructor(
    // private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  adminModel = new Login("", "");
  displaydiv = false;
  addAdmin() {
    this.displaydiv = true;
  }
  public code;
  public ID;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    // this._LoginService.volunteerdetails(this.code).subscribe(
    //   data => {
    //     this.volunteerdetaile = data;
    //     this.ID = this.code.slice(0, 9);
    //     console.log(this.volunteerdetaile);
    //   },
    //   error => {
    //     console.log(error);
    //     this.router.navigate(["login"]);
    //   }
    // );
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}

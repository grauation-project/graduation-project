import { Component, OnInit } from "@angular/core";
import { Login } from "../class/login";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  constructor(
    private _AdminService : AdminService ,
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
  
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  closeview(){
    this.displaydiv=false
  }
  onSubmit(userForm:NgForm){


    console.log(this.adminModel);
    this. _AdminService.addadmin(this.adminModel).subscribe(
      response => {
        console.log("Success!", response);
        userForm.reset();
        this.displaydiv=false

      },

      error => {
        console.log("error", error);
        // this.charityerror = error.error;

      }
    );
  }
  
}

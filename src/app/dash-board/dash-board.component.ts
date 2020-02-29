import { Component, OnInit } from "@angular/core";
import { Login } from "../class/login";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { Signup } from '../class/signup';

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
  displaydiv = false;
  charityerror=""
  addAdmin() {
    this.displaydiv = true;
  }
  public code;
  public ID;
  charitydetails:any= new Signup("", "", "", "", "", "", "", "");

  ngOnInit() {
   
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  closeview(){
    this.displaydiv=false
  }
 
  
}

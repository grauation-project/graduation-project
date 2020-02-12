import { Component, OnInit } from "@angular/core";
import { Login } from "../login";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  userModel = new Login("", "");
  ngOnInit() {}
  signuproute() {
    this.router.navigate(["signup"]);
  }
}

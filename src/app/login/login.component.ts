import { Component, OnInit } from "@angular/core";
import { Login } from "../class/login";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginserve: LoginService) {}
  loginModel = new Login("", "");
  ngOnInit() {}
  loginerror = "";
  onSubmit() {
    console.log(this.loginModel);
    this.loginserve.userlogin(this.loginModel).subscribe(
      response => {
        console.log("Success!", response);
        console.log("Success!", response.token);
        console.log(response.name);
        // this.router.navigate(["login"]);
        localStorage.setItem("token", response.token as string);
        if (response.name === "volunteer") {
          this.router.navigate(["/home/volunteer", response.volunteer]);
          console.log(response.volunteer);
        } else if (response.name === "charitiy") {
          this.router.navigate(["/home/charity", response.charity]);
          console.log(response.volunteer);
        } else {
          this.router.navigate(["/admin", response.admin]);
        }
      },

      error => {
        {
          this.loginerror = error.error;
          this.router.navigate(["login"]);
        }

        // this.router.navigate(["signup"]);
      }
    );
  }
  signuproute() {
    this.router.navigate(["signup"]);
  }
}

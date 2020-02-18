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

  onSubmit() {
    console.log(this.loginModel);
    this.loginserve.userlogin(this.loginModel).subscribe(
      response => {
        console.log("Success!", response);
        console.log("Success!", response.token);

        // this.router.navigate(["login"]);
        localStorage.setItem("token", response.token as string);
        this.router.navigate(["/homepage", response.volunteer]);
        console.log(response.volunteer);
      },

      error => {
        {
          console.log("error", error);
        }

        // this.router.navigate(["signup"]);
      }
    );
  }
}

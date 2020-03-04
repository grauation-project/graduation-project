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
    this.loginserve.userlogin(this.loginModel).subscribe(
      response => {
      
        localStorage.setItem("token", response.token as string);
        localStorage.setItem("name", response.name  as string);

        if (response.name === "volunteer") {
          this.router.navigate(["/home/volunteer", response.volunteer]);
          localStorage.setItem("id", response.volunteer as string);

        } else if (response.name === "charitiy") {
          this.router.navigate(["/home/charity", response.charity]);
          localStorage.setItem("id", response.charity as string);

        } else {
          localStorage.setItem("id", response.admin as string);

          this.router.navigate(["/admin", response.admin]);
        }
      },

      error => {
        {
          this.loginerror = "Something went wrong please try again";
          this.router.navigate(["login"]);
        }

      }
    );
  }
  signuproute() {
    this.router.navigate(["signup"]);
  }
  
}

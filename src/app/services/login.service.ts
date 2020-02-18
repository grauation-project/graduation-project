import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../class/login";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  authorized: boolean = false;
  private token: String;
  public signupurl = "http://localhost:3000/savethem/login";
  constructor(private _http: HttpClient) {}
  public userlogin(_login: Login): Observable<any> {
    return this._http.post<any>(this.signupurl, _login);
  }
  // private gettoken(): String {
  //   if (!this.token) {
  //     this.token = localStorage.getItem("token");
  //   }

  //   return this.token;
  // }
  volunteerdetails(_id): Observable<any> {
    return this._http.get<any>(
      "http://localhost:3000/savethem/volunteer/account/" + _id,
      {
        headers: new HttpHeaders().set(
          "x_auth_token_volunteer",
          localStorage.getItem("token")
        )
      }
    );
  }
}

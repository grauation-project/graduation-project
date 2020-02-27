import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Signup } from "../class/signup";
import{ Needs } from "../class/needs"
@Injectable({
  providedIn: "root"
})
export class CharityService {
  constructor(private http: HttpClient) {}

  signUpCharity(signup: Signup) {
    return this.http.post(
      "http://localhost:3000/savethem/charity/signup",
      signup
    );
  }
  listCharity(){
    return this.http.get('http://localhost:3000/search/listcharity')
  }
  createneed(needs:Needs ){

  }
}

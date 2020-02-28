import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Signup } from "../class/signup";
import { Needs } from "../class/needs"
import { Observable } from 'rxjs';
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
  addneed(need:Needs,_id){
    return this.http.post(
      "http://localhost:3000/savethem/needs/add/"+_id,
      need)
  }
  listneed(_id){
    return this.http.get<any>(
      "http://localhost:3000/savethem/needs/list/"+_id)
  }
  deleteneed(_id){
    return this.http.delete("http://localhost:3000/savethem/needs/delete/"+_id)
  }
  updateneed(need:Needs,_id){
    return this.http.post(
      "http://localhost:3000/savethem/needs/update/"+_id,
      need)
  }
}

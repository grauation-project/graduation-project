import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { Volunteer } from "../volunteer";
@Injectable({
  providedIn: "root"
})
export class VolunteersignupService {
  public signupurl = "http://localhost:3000/savethem/volunteer/signup";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private _http: HttpClient) {}
  public volunteersign(volunteerone: Volunteer): Observable<any> {
    return this._http.post<any>(this.signupurl, volunteerone);
  }
}

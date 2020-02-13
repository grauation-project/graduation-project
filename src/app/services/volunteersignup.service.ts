import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Volunteer } from '../volunteer';
@Injectable({
  providedIn: 'root'
})
export class VolunteersignupService {
   public signupurl="http://localhost:3000/volunteer/signup";
  constructor(private http:HttpClient) { 
  }
 public volunteersignup(volunteer:Volunteer){
    return this.http.post(this.signupurl,volunteer);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../class/signup';


@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http:HttpClient) { }

  signUpCharity(signup:Signup)
{
return this.http.post<any>("http://localhost:3000/charity/signup",signup);
}
}

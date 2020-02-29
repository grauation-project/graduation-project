import { Injectable } from '@angular/core';
import { Login } from '../class/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addadmin(admin:Login){
    return this.http.post(
      "http://localhost:3000/savethem/admin/add",
      admin)
  }
}

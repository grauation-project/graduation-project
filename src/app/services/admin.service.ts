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
  getcharities(){
    return this.http.get('http://localhost:3000/savethem/admin/charity/list')
  }
  deletecharity(_id){
    return this.http.delete(
      "http://localhost:3000/savethem/admin/charity/delete/"+_id)

  }
  getvolunteers(){
    return this.http.get('http://localhost:3000/savethem/admin/volunteer/list')
  }
  deletevolunteer(_id){
    return this.http.delete(
      "http://localhost:3000/savethem/admin/volunteer/delete/"+_id)

  }
}

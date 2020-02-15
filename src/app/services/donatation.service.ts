import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { from } from 'rxjs';
import { DonationMaterial } from '../class/donation-material';

@Injectable({
  providedIn: 'root'
})
export class DonatationService {
public DonateMaterialURL = "http://localhost:3000/donate/material";
constructor(private http:HttpClient)  { }


  donateMaterial(materialDonate:DonationMaterial){
    return this.http.post(this.DonateMaterialURL,materialDonate);
  }
}

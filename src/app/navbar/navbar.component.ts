import { Component, OnInit } from "@angular/core";
import { DonatationService } from '../services/donatation.service';

import {Router} from '@angular/router';

import { error } from 'protractor';

declare var require: any;
import { PaymentService } from "../services/payment.service";
import { Payment } from "../class/payment";
import { DonationMaterial } from '../class/donation-material';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  providers: [PaymentService]
})
export class NavbarComponent implements OnInit {
  public donateamount = "";
  charityHasErr: any;
  displaydiv1 = true;
  displaydiv2 = false;
  public new_payment = new Payment("", "", "", "", "", 0, "", 0, 0);

  constructor(
    private donateMaterialSerives: DonatationService,
    private router :Router,
    private _PaymentService: PaymentService
    ) { }
 public donationMaterial= new DonationMaterial("","","","","","","","")
  ngOnInit() {
    
   
  }
  
  donate(amount) {
    this.donateamount = amount
  }
  
  onSubmit() {
    console.log(this.new_payment);
    this._PaymentService.postpayment(this.new_payment).subscribe(
      response => console.log("Success!", response),
      error => console.log("error", error)
    );
  }

  
  // ngOnInit() {}
  // donate(amount) {
  //   this.donateamount = amount;
  // }

  Validatecharity(charityname) {
    if (charityname === "default") {
      this.charityHasErr = true;
    } else {
      this.charityHasErr = false;
    }
  }
  material() {
    this.displaydiv1 = false;
    this.displaydiv2 = true;
  }
  online() {
    this.displaydiv1 = true;
    this.displaydiv2 = false;
  }
  imgnav = require("../../assets/1.jpg");
  scrolltoel() {
    document
      .querySelector("#about_us")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
  scrolltoel3() {
    document
      .querySelector("#contact_us")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
  closeDonate(){
    this.router.navigate(["/home"])
  }
  
  Donate(){
     this.donateMaterialSerives.donateMaterial(this.donationMaterial).subscribe(
       response => console.log('Success!', response),  
       error => console.log(error))
     }
  scrolltoel4() {
    document
      .querySelector("#howitwork")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

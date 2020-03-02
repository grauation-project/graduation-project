import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../services/payment.service";
import { Payment } from "../class/payment";
import { Router } from "@angular/router";
import { DonationMaterial } from '../class/donation-material';
import { DonatationService } from '../services/donatation.service';

declare var require: any;
declare var $: any;

@Component({
  selector: "app-donation",
  templateUrl: "./donation.component.html",
  styleUrls: ["./donation.component.css"],
  providers: [PaymentService]
})
export class DonationComponent implements OnInit {
  ispayment = true;
  ismaterial = false;
  public donateamount = "";
  charityHasErr: any;
  errormsg = "";
  
  donationMaterial= new DonationMaterial("","","","","","","","")

  constructor(
    private _PaymentService: PaymentService,
    private donateMaterialSerives :DonatationService,
    private router: Router
  ) {}
  paymentregister() {
    this.ispayment = true;
    this.ismaterial = false;
  }
  materialregister() {
    this.ispayment = false;
    this.ismaterial = true;
  }

  material() {
    this.ispayment = false;
    this.ismaterial = true;
  }
  online() {
    this.ispayment = true;
    this.ismaterial = false;
  }
  donate(amount) {
    this.donateamount = amount;
  }
  ngOnInit() {}
  public new_payment = new Payment("", "", "", "", "", "", "", "", 0);

  onSubmit() {
    console.log(this.new_payment);
    this._PaymentService.postpayment(this.new_payment).subscribe(
      response => {
        console.log("Success!");
        this.router.navigate(["done"]);
      },
      error => {
        console.log("error", error);
        this.router.navigate(["donation"]);
        this.errormsg = error.error;
      }
    );
  }
  Validatecharity(charityname) {
    if (charityname === "default") {
      this.charityHasErr = true;
    } else {
      this.charityHasErr = false;
    }
  }
  Donate() {
    console.log("hiiiii")
    this.donateMaterialSerives.DonateMaterial(this.donationMaterial).subscribe(
      response => console.log("Success!", response),
      error => console.log(error)
    );
  }
  
}

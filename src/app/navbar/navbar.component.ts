import { Component, OnInit } from "@angular/core";
declare var require: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public donateamount = ''
  charityHasErr: any;
  constructor() { }
displaydiv1=true;
displaydiv2=false
  ngOnInit() {
  }
  donate(amount) {
    this.donateamount = amount


  }
  Validatecharity(charityname) {
    if (charityname === "default") {
      this.charityHasErr = true;
    }
    else {
      this.charityHasErr = false;
    }
  }
material(){
  this.displaydiv1=false;
  this.displaydiv2=true;
}
online(){
  this.displaydiv1=true;
  this.displaydiv2=false;
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
}

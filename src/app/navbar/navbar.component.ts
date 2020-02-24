import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  // displaymodal = true;
  constructor() {}

  ngOnInit() {}

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

  scrolltoel4() {
    document
      .querySelector("#howitwork")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

import { Component, OnInit } from "@angular/core";
declare var require: any;

@Component({
  selector: "app-aboutus",
  templateUrl: "./aboutus.component.html",
  styleUrls: ["./aboutus.component.css"]
})
export class AboutusComponent implements OnInit {
  imgname = require("../../assets/fb9fLIXXL8.jpg");

  constructor() {}

  ngOnInit() {}
}

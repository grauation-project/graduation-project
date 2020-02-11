import { Component, OnInit } from "@angular/core";
declare var require: any;

@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  imgprofile = require("../../assets/3.jpg");

  constructor() {}

  ngOnInit() {}
}

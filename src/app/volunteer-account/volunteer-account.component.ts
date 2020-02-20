import { Component, OnInit } from "@angular/core";
declare var require: any;

@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  imgprofile = require("../../assets/3.jpg");
  imgnav = require("../../assets/1.jpg");
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  searchs = [
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
displaydiv = false;
searcheng(){
  this.displaydiv = true;
}
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  public donateamount = ''
  charityHasErr: any;
  constructor() { }

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
}

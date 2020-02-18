import { Component, OnInit } from '@angular/core';
import { Login } from '../login';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor() { }
  adminModel = new Login("","")
  displaydiv = false;
  addAdmin(){
    this.displaydiv = true;
  }

  ngOnInit() {
  }

}

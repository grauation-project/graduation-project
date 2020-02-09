import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
displaydiv1=true;
displaydiv2=false
  ngOnInit() {
  }
material(){
  this.displaydiv1=false;
  this.displaydiv2=true;
}
online(){
  this.displaydiv1=true;
  this.displaydiv2=false;
}

}

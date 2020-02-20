import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charity-account',
  templateUrl: './charity-account.component.html',
  styleUrls: ['./charity-account.component.css']
})
export class CharityAccountComponent implements OnInit {
    title = 'Angular Search Using ng2-search-filter';
    searchText;
    searchs = [
      { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
    ];
  displaydiv = false;
  searcheng(){
    this.displaydiv = true;
  }
  constructor() { }

  ngOnInit() {
  }
  
  
}

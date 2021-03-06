import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Signup } from '../class/signup';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-charity',
  templateUrl: './admin-charity.component.html',
  styleUrls: ['./admin-charity.component.css']
})
export class AdminCharityComponent implements OnInit {

  constructor(private _AdminService : AdminService, private router: Router,
    private route: ActivatedRoute) { }
  charitydetails:any= new Signup("", "", "", "", "", "", "", "");
  public code;
  public ID;

  ngOnInit() {
    this._AdminService.getcharities().subscribe(
      data  => {
        this.charitydetails = data;

      },

      error => {

      }
    );
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
  
  }
  deletecharity(charitydetails){

this._AdminService.deletecharity(charitydetails._id).subscribe(


  response => {


  this._AdminService.getcharities().subscribe(
    data  => {
      this.charitydetails = data;

    },

    error => {

    }
  );
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.code = params.get("_id");
  });




},  error => {

} 










)

  }
}

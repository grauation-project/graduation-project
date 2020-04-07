import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../class/login';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  constructor(private _AdminService : AdminService) { }
  adminModel = new Login("", "");
  charityerror=""

  ngOnInit() {
  }
  onSubmit(userForm:NgForm){


    console.log(this.adminModel);
    this. _AdminService.addadmin(this.adminModel).subscribe(
      response => {
       
        userForm.reset();
        this.charityerror="Added Sucessfuly"
      },

      error => {
       
        this.charityerror = error.error;

      }
    );
  }
}

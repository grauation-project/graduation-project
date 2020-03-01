import { Component, OnInit } from '@angular/core';
import { Login } from '../class/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
useremail=new Login("","")
  constructor(private _LoginService:LoginService  ) { }
  submitted=true;
  submit=false
  ngOnInit() {
  }
  onSubmit(){

    this._LoginService.forgerpassword(this.useremail).subscribe(
     response=>{
       console.log(response);
       this.submitted=false;
       this.submit=true

    },
     error=>{console.log(error)}


    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Forgetpassword } from '../class/forgetpassword';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public code;
  public ID;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _LoginService:LoginService) { }
userModel = new Forgetpassword("","","")
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
  }
  onSubmit(){
    this._LoginService.resetpassword(this.userModel).subscribe(


      response=>{
        
        console.log(response)
      localStorage.removeItem("token");
      this.router.navigate(["login"]);

      
      },
      error=>{
        console.log(error)
        localStorage.removeItem("token");
        this.router.navigate(["resetpassword"]);

      }
    )
  }
}

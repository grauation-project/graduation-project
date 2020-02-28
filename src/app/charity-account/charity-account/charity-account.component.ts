import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Signup } from "src/app/class/signup";
import { LoginService } from "src/app/services/login.service";
import { CharityService } from 'src/app/services/charity.service';
import { VolunteersignupService } from 'src/app/services/volunteersignup.service';
import { Needs } from "../../class/needs"
import { NgForm } from '@angular/forms';
import { Listneed } from 'src/app/class/listneed';
@Component({
  selector: "app-charity-account",
  templateUrl: "./charity-account.component.html",
  styleUrls: ["./charity-account.component.css"]
})
export class CharityAccountComponent implements OnInit {
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService,

  ) {}
  public code;
  public ID;
  isadd=false;
  isupdate=false;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  need = new Needs ("","","")
  listneeds = new Listneed ("","","","")
    title = 'Angular Search Using ng2-search-filter';
    searchText;
    listvolunteersearch ;
    listcharitysearch ;
    // slsText;
  displaydiv = false;
  searcheng(){
    this.displaydiv = true;
  }
  toggleadd(){
    this.isadd=true
   this.need.name="";
   this.need.quantity=""
   this.need.description=""


  }
  addneed(addneeds:NgForm){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.addneed(this.need,this.code).subscribe(

      response => {console.log("Success!", response)
      ,  this.isadd=false,
      addneeds.reset()
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.charitydetaile);
        },
        error => {
          console.log(error);
          this.router.navigate(["login"]);
        }
      );
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
        }
  
      )
      

    },
        error => {
          console.log("error!", error),
          addneeds.reset()

        } 
          
    )

  }
  updateneeds(needs){

document.getElementById(needs._id).style.display="block"
this.need.name=needs.name;
this.need.quantity=needs.quantity;
this.need.description=needs.description


}
closetest(needs){
  document.getElementById(needs._id).style.display="none"

}
  updateneedss(needs,addneeds:NgForm){


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.updateneed(this.need,needs._id).subscribe(

      response => {console.log("Success!", response)
      this.isupdate=false;
      addneeds.reset()

      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.charitydetaile);
        },
        error => {
          console.log(error);
          this.router.navigate(["login"]);
        }
      );
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
          addneeds.reset()

        }
  
      )
      

    },
        error => {
          console.log("error!", error)

        } 
          
    )


  }
  deleteneeds(needs){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.deleteneed(needs._id).subscribe(

      response => {console.log("Success!", response)
      
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.charitydetaile);
        },
        error => {
          console.log(error);
          this.router.navigate(["login"]);
        }
      );
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
        }
  
      )
      

    },
        error => {
          console.log("error!", error)

        } 
          
    )


  }
  closeview(){
    this.isadd=false
this.isupdate=false
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.ID = this.code.slice(0, 9);
        console.log(this.charitydetaile);
      },
      error => {
        console.log(error);
        this.router.navigate(["login"]);
      }
    );
  // subscribe search
    this.charityService.listCharity().subscribe(data=>{
      this.listcharitysearch=data
    });
    this.volunteerService.listvolunteer().subscribe(data=>{
      this.listvolunteersearch=data
    });
    this.charityService.listneed(this.code).subscribe(
      data => {
        
        this.listneeds = data;
        this.ID = this.code.slice(0, 9);
        console.log(this.listneeds);
      },
      error => {
        console.log(error);
      }

    )
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
  
  govolunteer(volunteer){
    console.log(volunteer);
    this.router.navigate(['home/volunteer/'+volunteer._id+'/volunteer/account']);
    
  }
  gocharity(charity){
    console.log(charity);
    this.router.navigate(['home/charity/'+charity._id+'/charity/account']);
  }
}

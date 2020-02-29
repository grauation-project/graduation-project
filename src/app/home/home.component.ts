import { Component, OnInit } from '@angular/core';
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { LoginService } from "../services/login.service";
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Follow } from '../class/follow';
import { log } from 'util';
// import { VolunteerList } from '../class/volunteer copy';
declare var require: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  charities: unknown;
  
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives:PostSeriveService,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService

  ) {}
  title = 'Angular Search Using ng2-search-filter';
  searchText ;
  listvolunteersearch;
  listcharitysearch ;
  // slsText;
displaydiv = false;
searcheng(){
  this.displaydiv = true;
}
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "");
  
  public code;
  public ID;
  imgnav = require("../../assets/1.jpg");
  public Allpost
  public newPost = new Post('','', '',[],[],null)
  post
  ngOnInit() {

    this.postSerives.getpost().subscribe(data=>{
      console.log(data)
      this.Allpost=data
    });

    
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.volunteerdetails(this.code).subscribe(
      data => {
        this.volunteerdetaile = data;
        this.ID = this.code.slice(0, 9);
        console.log(this.volunteerdetaile);
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
      
    })
  }

onSubmit(){
  console.log(this.code)
    console.log("create")
     this.newPost.postedby = this.code
    console.log(this.code)
    this.postSerives.newpost(this.newPost)
    console.log(this.newPost),
      this.postSerives.getpost().subscribe(data => {
        console.log(data)
        this.Allpost = data
      })

      this.newPost.title="",
      this.newPost.content=""

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

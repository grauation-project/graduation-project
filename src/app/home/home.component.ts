import { Component, OnInit } from '@angular/core';
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { LoginService } from "../services/login.service";
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
declare var require: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives:PostSeriveService
  ) {}
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "");
  public code;
  public ID;
  imgnav = require("../../assets/1.jpg");
  public Allpost
  public newPost = new Post('','', '',[],[])
  post
  ngOnInit() {

    this.postSerives.getpost().subscribe(data=>{
      console.log(data)
      this.Allpost=data
    })


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
  }

onSubmit(){
  console.log("create")
  this.newPost.postedby = this.code
      this.postSerives.newpost(this.newPost),
      this.postSerives.getpost().subscribe(data=>{
        console.log(data)
        this.Allpost=data
      }) 
    }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}

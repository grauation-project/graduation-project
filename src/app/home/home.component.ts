import { Component, OnInit } from '@angular/core';
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { LoginService } from "../services/login.service";
import { Volunteerdetails } from "../class/volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Follow } from '../class/follow';
import { log } from 'util';
import { Like } from '../class/like';
import { Comment } from 'src/app/class/comment';
// import { VolunteerList } from '../class/volunteer copy';
declare var require: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  charities;
  commentByCharity;
  commentByVolunteer;
  commentpost;
  likeNo:false
  IDpost: string;
  AllLikes;
  public likeclass = new Like([], '');
  public commentclass = new Comment("", [], "");
  postlikes: any;
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
  profileimagee=""
 // slsText;
 displaydiv = false;
 cahritysearchlist:boolean = false;
 Voluntersearchlist:boolean = false;
 
 Voluntersearch(){
   this.Voluntersearchlist = true;
   this.cahritysearchlist = false;

 }
 Charitysearch(){
   this.cahritysearchlist = true;
   this.Voluntersearchlist = false;

 }
 searcheng() {
   this.displaydiv = true;
 }
 searcheng2(){
   this.displaydiv=false;
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
        this.profileimagee= require("../../../server/upload/"+this.volunteerdetaile .img.substr(12));
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
refresh(){

  // this.postSerives.getpost().subscribe(data=>{
  //   console.log(data)
  //   this.Allpost=data
  // });

  
  this.route.paramMap.subscribe((params: ParamMap) => {
    this.code = params.get("_id");
    console.log(typeof params.get("_id"));
  });
  this._LoginService.volunteerdetails(this.code).subscribe(
    data => {
      this.volunteerdetaile = data;
      this.profileimagee= require("../../../server/upload/"+this.volunteerdetaile .img.substr(12));
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


 Comment(post) {
   
    this.IDpost = post._id
  this.postSerives.displaycomment(this.IDpost)
   this.postSerives.allcomment().subscribe(allcomment => {
    // console.log(allcomment)
    this.commentpost = allcomment

  for(let comment of this.commentpost){
      // console.log(comment.postedby)
      this.commentPostedBy = comment.postedby


   this.postSerives.findUser(this.commentPostedBy)
      // console.log(this.commentPostedBy)

       this.postSerives.volunteer().subscribe(volunteer => {
       this.commentByVolunteer = volunteer
        // console.log(this.commentByVolunteer)
        // console.log(this.commentByVolunteer.name);
        
      })
    
      this.postSerives.charity().subscribe(charity => {
        this.commentByCharity = charity
        // console.log(this.commentByCharity)
        console.log(this.commentByCharity.name);
        
      })


    }
    
  })
}
  commentPostedBy(commentPostedBy: any) {
    throw new Error("Method not implemented.");
  }
 async commentByC(comment,commentByC){
  if(comment === commentByC){
   return true
  }
}


commentByV(comment,commentByV){
if(comment === commentByV){
return true
}
}

commentt(p,c) {
  // console.log(p);
  // console.log(c);
  if (p== c) {
    return true
  }
}


sendcomment(comment,post) {
  console.log(comment)
  console.log(post)
  this.commentclass.postedby = this.code
  this.IDpost = post._id
  this.commentclass.post = this.IDpost
  console.log(this.commentclass);

  this.postSerives.comment(this.commentclass)

  this.IDpost = post._id
  this.postSerives.displaycomment(this.IDpost)
  this.postSerives.allcomment().subscribe(allcomment => {
    console.log(allcomment)
    this.commentpost = allcomment
    
  })


  this.commentclass.text =''
 

}

like(post) {
  // this.likeNo=true
  this.likeclass.postedby = this.code
  this.IDpost = post._id
  this.likeclass.post = this.IDpost
  console.log(this.likeclass);

  this.postSerives.postlikes(this.IDpost)
  this.postSerives.getLikes().subscribe(likes => {
    console.log(likes)
    this.AllLikes = likes

    for(let like of this.AllLikes){
      // console.log(like);
      
      if(like.post === this.IDpost && like.postedby === this.code){
        this.postSerives.removelike(this.likeclass)
        this.postSerives.postlikeslast().subscribe(likes=>{
          console.log(likes +"qqqqqqq");
          
        })
      }
    }
  })
  this.postSerives.like(this.likeclass)

  // this.postSerives.getThisLike().subscribe(like=>{
  //   console.log(like);

  // })
// post like
  this.postSerives.postlikes(this.likeclass.post)
  this.postSerives.getLikes().subscribe(likes => {
    console.log(likes)
    this.AllLikes = likes
   console.log( this.postlikes);
   this.postlikes=this.AllLikes.length
  });
}

}

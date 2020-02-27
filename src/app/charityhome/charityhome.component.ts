import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Signup } from "../class/signup";
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { Like } from '../class/like';
import {Comment} from  '../class/comment'
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Follow } from '../class/follow';
@Component({
  selector: "app-charityhome",
  templateUrl: "./charityhome.component.html",
  styleUrls: ["./charityhome.component.css"]
})
export class CharityhomeComponent implements OnInit {
  createpost;
  public email;
  charities: unknown;
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService,

  ) {}
  public code;
  AllLikes;
  IDpost: string;
  likesPostedby: any;
  commentpost;
  public ID;
  public Allpost
  public iscomment = false;
  public isfollow =false;
 
  public islike = false;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  public newPost = new Post('', '', "",[],[],null)
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public followClass =new Follow ("","")
 
  searchText;
  listvolunteersearch ;
  listcharitysearch ;
  // slsText;
displaydiv = false;
searcheng(){
  this.displaydiv = true;
}

  ngOnInit() {

    
    // console.log(this.charitydetaile);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      //  console.log(typeof this.code)
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


    this.postSerives.getpost().subscribe(data => {
      console.log(data)
      this.Allpost = data
    });

    this.postSerives.getallcharity();

this.postSerives.charities().subscribe(charities => {
  console.log(charities)
  this.charities = charities

  
});
    

     // subscribe search
  this.charityService.listCharity().subscribe(data=>{
    this.listcharitysearch=data
  });
  this.volunteerService.listvolunteer().subscribe(data=>{
    this.listvolunteersearch=data
  })

  }
  refresh() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        // console.log(data)
        this.ID = this.code.slice(0, 9);



      },
      error => {
        console.log(error);
        this.router.navigate(["login"]);
      }
    );
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  onSubmit() {
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

  comment() {
    this.iscomment = true;
    
}

  sendcomment() {
    console.log('comment')
    this.commentclass.postedby = this.code
    this.IDpost = document.getElementById('postID').innerHTML
    this.commentclass.post = this.IDpost
    console.log(this.commentclass);

    this.postSerives.comment(this.commentclass)

    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.displaycomment(this.IDpost)
    this.postSerives.allcomment().subscribe(allcomment => {
      console.log(allcomment)
      this.commentpost=allcomment
  })
  }
  like() {
    document.getElementById("like").style.color = "#3B6D8C";
    this.likeclass.postedby = this.code
    this.IDpost = document.getElementById('postID').innerHTML
    this.likeclass.post = this.IDpost
    console.log(this.likeclass);

    this.postSerives.like(this.likeclass)


  }

  showlike(){
    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      console.log(likes)
      this.AllLikes=likes
      this.AllLikes.postedby=this.likesPostedby
      this.postSerives.getlikesPostedby(this.likesPostedby)
      this.islike=true
  })
  }


  follow(charity){

    document.getElementById(charity._id).style.display="none";
    document.getElementById(charity.email).style.display="block";
  
//     this.isfollow=false
//     console.log("hhhhhhhhh")
   console.log(charity._id)
   this.followClass.follower=this.code
   this.followClass.following =charity._id
   console.log(this.followClass)
this.postSerives.follow(this.followClass)
  }
 
  charityProfile(charity){
    this.router.navigate(['/charity/account/_id',charity])
  }

 
}

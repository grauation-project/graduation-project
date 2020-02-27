import { Component, OnInit } from "@angular/core";
declare var require: any;
import { Volunteerdetails } from "../class/Volunteerdetails";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { Like } from '../class/like';
import { Comment } from 'src/app/class/comment';
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Edit } from '../class/edit';
@Component({
  selector: "app-volunteer-account",
  templateUrl: "./volunteer-account.component.html",
  styleUrls: ["./volunteer-account.component.css"]
})
export class VolunteerAccountComponent implements OnInit {
  imgprofile = require("../../assets/3.jpg");
  imgnav = require("../../assets/1.jpg");
  volunteerdetaile = new Volunteerdetails("", "", "", "", "", "", "", "");
  public code;
  public iscomment = false;
  public islike = false;
  public charityposts;
  public ID;
  IDpost: string;
  editpost: {}
  commentpost;
  edititle: any;
  AllLikes;
  postTitle;
  postContent;
  likesPostedby: any;
  public showcomment =false
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public newPost = new Post('', '', '', [], [],null);
  public editclass = new Edit("", "", "", "")

  title = 'Angular Search Using ng2-search-filter';
  searchText;
  listvolunteersearch ;
  listcharitysearch ;
  // slsText;
displaydiv = false;
  IDpostdelete: any;
searcheng(){
  this.displaydiv = true;
}
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService:CharityService,
    private volunteerService:VolunteersignupService

  ) {}

  ngOnInit() {
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

    this.postSerives.getcharityid(this.code)
    console.log(this.code)

    this.postSerives.charityposts().subscribe(posts => {
      console.log(posts)
      this.charityposts = posts
    })
     // subscribe search
     this.charityService.listCharity().subscribe(data=>{
      this.listcharitysearch=data
    });
    this.volunteerService.listvolunteer().subscribe(data=>{
      this.listvolunteersearch=data
    })
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  charityid() {
    this.postSerives.getcharityid(this.code)
  }

  onSubmit() {
    console.log("create")
    this.newPost.postedby = this.code
    this.postSerives.newpostfromACC(this.newPost),
      console.log(this.newPost),
      this.postSerives.getcharityid(this.code)
    console.log(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      console.log(allpostcharity)
      this.charityposts=allpostcharity

    })
    this.newPost.title="",
    this.newPost.content=""
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
      this.likesPostedby=document.getElementById("likepostedby")
      console.log( this.likesPostedby)
      this.postSerives.getlikesPostedby(this.likesPostedby)
      this.islike=true
  })
  }
  comment() {
    this.iscomment = true;
    this.showcomment=true

this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.displaycomment(this.IDpost)
    this.postSerives.allcomment().subscribe(allcomment => {
      console.log(allcomment)
      this.commentpost = allcomment
    })

    
}

editbutton(post) {

  console.log(post._id)
  this.IDpost=post._id
  this.postTitle=post.title
  console.log(this.postTitle)
  this.postContent=post.content
  console.log(this.postContent)
  
}

  edit() {
    this.editclass.postID = this.IDpost
    this.editclass.postedby = this.code

    console.log(this.editclass)
    this.postSerives.edit(this.editclass)

    this.postSerives.getcharityid(this.code)
    console.log(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      console.log(allpostcharity)
      this.charityposts = allpostcharity

      this.editclass.title = "",
        this.editclass.content = ""


    })
  }
  deletebutton(post){
    console.log(post._id)
    this.IDpostdelete=post._id
  }
  delete() {

    // this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.delete(this.IDpostdelete)
    console.log(this.IDpostdelete);
    this.postSerives.getcharityid(this.code)
    console.log(this.code)
    this.postSerives.charityposts().subscribe(posts => {
      console.log(posts)
      this.charityposts = posts
    })
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
  
 
}

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Signup } from "src/app/class/signup";
import { LoginService } from "src/app/services/login.service";
import { PostSeriveService } from 'src/app/services/post-serive.service';
import { Post } from 'src/app/class/post';
import { Comment } from 'src/app/class/comment';
import { Like } from 'src/app/class/like'
import { from } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Edit } from 'src/app/class/edit';
@Component({
  selector: "app-charity-account",
  templateUrl: "./charity-account.component.html",
  styleUrls: ["./charity-account.component.css"]
})
export class CharityAccountComponent implements OnInit {
  public charityposts;
  IDpost: string;
  editpost: {}
  commentpost;
  edititle: any;
  AllLikes;
  likesPostedby: any;
  postTitle;
  postContent;
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService
  ) { }
  public iscomment = false;
  public islike = false;
  public showcomment =false
  public code;
  public ID;
  public Allpost
  public editTitle;
  public editcontent;
  public newPost = new Post('', '', '', [], []);
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public editclass = new Edit("", "", "", "")
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  ngOnInit() {

    // this.postSerives.charityposts().subscribe(allpostcharity => {
    //   console.log(allpostcharity)
    //   // this.charityposts=allpostcharity
    // })

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      // console.log(this.code)
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
    this.postSerives.getcharityid(this.code)
    console.log(this.code)

    this.postSerives.charityposts().subscribe(posts => {
      // console.log(posts)
      this.charityposts = posts
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
      this.charityposts = allpostcharity

      // this.newPost.title = "",
      //   this.newPost.content = ""

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

  showlike() {
    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      console.log(likes)
      this.AllLikes = likes
      this.likesPostedby=document.getElementById('likepostedby').innerHTML
      console.log(this.likesPostedby)
      // this.postSerives.getlikesPostedby(this.likesPostedby)
      // this.islike = true
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
  editbutton() {
    this.postTitle = document.getElementById('postTitle').innerHTML
    this.postContent = document.getElementById('postContent').innerHTML

    

  }

  edit() {
    this.IDpost = document.getElementById('postID').innerHTML
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
  delete() {

    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.delete(this.IDpost)
    console.log(this.IDpost);
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
      this.commentpost = allcomment
    })
  }




}

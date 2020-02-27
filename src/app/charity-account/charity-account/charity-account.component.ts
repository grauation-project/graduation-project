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
import { CharityService } from 'src/app/services/charity.service';
import { VolunteersignupService } from 'src/app/services/volunteersignup.service';
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
  commentby;
  TitlePost: string;
  IDpostdelete: any;
  idpostcomment: any;
  public com: false
  ccc: boolean;
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService: CharityService,
    private volunteerService: VolunteersignupService
  ) { }
  public iscomment = false;
  public islike = false;
  public showcomment = false



  public code;
  public ID;
  public Allpost
  public editTitle;

  public editcontent;
  public newPost = new Post('', '', '', [], [], null);
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public editclass = new Edit("", "", "", "")
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  title = 'Angular Search Using ng2-search-filter';
  searchText;
  listvolunteersearch;
  listcharitysearch;
  // slsText;
  displaydiv = false;
  searcheng() {
    this.displaydiv = true;
  }

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
      console.log(posts)
      this.charityposts = posts
    })

    // subscribe search
    this.charityService.listCharity().subscribe(data => {
      this.listcharitysearch = data
    });
    this.volunteerService.listvolunteer().subscribe(data => {
      this.listvolunteersearch = data
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

    })
    this.newPost.title = "",
      this.newPost.content = ""

  }
  like(post) {
    document.getElementById("like").style.color = "#3B6D8C";
    this.likeclass.postedby = this.code
    this.IDpost = post._id
    this.likeclass.post = this.IDpost
    console.log(this.likeclass);
    this.postSerives.like(this.likeclass)

    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      console.log(likes)
      this.AllLikes = likes
    })
  }

  // showlike() {
  //   // this.IDpost = document.getElementById('postID').innerHTML
  //   this.postSerives.postlikes(this.IDpost)
  //   this.postSerives.getLikes().subscribe(likes => {
  //     console.log(likes)
  //     this.AllLikes = likes
  //     // this.likesPostedby = document.getElementById('likepostedby').innerHTML
  //     // console.log(this.likesPostedby)
  //     // this.postSerives.getlikesPostedby(this.likesPostedby)
  //     // this.islike = true
  //   })
  // }
  comment(post) {

    this.iscomment = true
    // console.log(post)
    this.idpostcomment = post._id
    // console.log( this.idpostcomment)
    this.postSerives.displaycomment(this.idpostcomment)

    this.postSerives.allcomment().subscribe(allcomment => {
      console.log(allcomment)
      this.commentpost = allcomment



    })
    // for(var i=0;i<this.commentpost.length; i++){
    //   this.commentby = this.commentpost[i]
    //   console.log(this.commentby.post)
    // }







    // var ID =document.getElementById("commentBY").innerHTML
    // console.log(ID)


    // var i = 0;
    // this.commentby = this.commentpost.postedby
    // var id=""
    // for (; i < this.commentby.length; i++)
    //   // this.commentby = this.commentpost[i].postedby
    //    id +=this.commentpost[i].postedby
    // this.commentby = this.commentpost[0].postedby
    // /console.log(this.commentby)




  }
  editbutton(post) {

    console.log(post._id)
    this.IDpost = post._id
    this.postTitle = post.title
    console.log(this.postTitle)
    this.postContent = post.content
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

  deletebutton(post) {
    console.log(post._id)
    this.IDpostdelete = post._id
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

  sendcomment(comment) {
    console.log(comment)
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
      // this.commentby = this.commentpost.postedby
      // console.log(this.commentby)
    })
    //   this.commentby=document.getElementById("commentBY").innerHTML

    //   console.log(this.commentby)

    // }


  }

  follow(charity) {
    console.log(charity._id)


  }



  // home()){
  //   this.router.navigate(["/home/charity/:_id",this.charitydetaile)])
  // }

  commentt(p,c) {
    console.log(p);
    console.log(c);
    if (p== c) {
      return true
    }
  }

  commen(pp,cc) {
    console.log(pp);
    console.log(cc);
    // if (post == comment) {
    //   return true
    // }
  }

  hidden(comment) {
    console.log(comment.postedby)
    this.postSerives.finduser(comment.postedby)
  }

}

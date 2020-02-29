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
  idPostComment: any;
  public com: false
  ccc: boolean;
  postedByVolunteer: unknown;
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

public commentByCharity;
public commentByVolunteer ;
  public code;
  public ID;
  public Allpost
  public editTitle;
public commentPostedBy;
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

    //charity post
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

  // create post
  createPost() {
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



// like

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
 
// Edit post

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

  // delete post
  deletebutton(post) {
    console.log(post._id)
    this.IDpostdelete = post._id
  }
  delete() {

    this.postSerives.delete(this.IDpostdelete)
    console.log(this.IDpostdelete);
    this.postSerives.getcharityid(this.code)
    console.log(this.code)
    this.postSerives.charityposts().subscribe(posts => {
      console.log(posts)
      this.charityposts = posts
    })
  }



 
  follow(charity) {
    console.log(charity._id)


  }

//   commntt(pp,cc){
//     console.log(pp);
//     console.log(cc);
//     if(pp===cc)
// {
//   return true
// }    
    
//   }

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
          console.log(this.commentByVolunteer.name);
          
        })
      
        this.postSerives.charity().subscribe(charity => {
          this.commentByCharity = charity
          // console.log(this.commentByCharity)
          console.log(this.commentByCharity.name);
          
        })


      }
      
    })
  }
  commentByC(comment,commentByC){
    if(comment === commentByC){
      return true
    }
  }


  commentByV(comment,commentByV){
if(comment === commentByV){
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




  
  commentt(p,c) {
    // console.log(p);
    // console.log(c);
    if (p== c) {
      return true
    }
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

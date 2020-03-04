import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Signup } from "../class/signup";
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import { Like } from '../class/like';
import { Comment } from '../class/comment'
import { CharityService } from '../services/charity.service';
import { VolunteersignupService } from '../services/volunteersignup.service';
import { Follow } from '../class/follow';
import * as $ from 'jquery'
import { AdminService } from '../services/admin.service';
declare var require: any;

@Component({
  selector: "app-charityhome",
  templateUrl: "./charityhome.component.html",
  styleUrls: ["./charityhome.component.css"]
})
export class CharityhomeComponent implements OnInit {
  createpost;
  public email;
  charities: unknown;
  postPostedBy: any;
  profileimageee="";
  profileimag=""
  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService: CharityService,
    private volunteerService: VolunteersignupService,
    private _AdminService : AdminService

  ) { }
  public code;
  AllLikes;
  IDpost: string;
  likesPostedby: any;
  commentpost;
  public ID;
  public postedByVolunteer;
  public Allpost;
  public postedByCharity;
  public iscomment = false;
  public following=false;
  public isfollow = false;
  public Following = {}
  public islike = false;
  charitydetaile = new Signup("", "", "", "", "", "", "", "");
  public newPost = new Post('', '', "", [], [], null)
  public likeclass = new Like([], '')
  public commentclass = new Comment("", [], "");
  public followClass = new Follow("", "")
  randomNumber = Math.floor(Math.random() * 10) + 1;

  searchText;
  listvolunteersearch;
  listcharitysearch;
  // slsText;
  displaydiv = false;
  auth=true;
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
charitydetails:any= new Signup("", "", "", "", "", "", "", "");

  ngOnInit() {
    $("#addfolloing").on('click',function(){
      $(this).closest("#charitysuggest").remove();
     })

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.charitydetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
      },
      error => {
        this.router.navigate(["login"]);
      }
    );

    this.postSerives.getpost().subscribe(data => {
      this.Allpost = data
      for (let post of this.Allpost) {
        this.postPostedBy = post.postedby

        this.postSerives.findUser(this.postPostedBy)

        this.postSerives.volunteer().subscribe(volunteer => {
          this.postedByVolunteer = volunteer
        })
      
        this.postSerives.charity().subscribe(charity => {
          this.postedByCharity = charity
        })
        

      }

    });

    this.postSerives.getallcharity();

    this.postSerives.charities().subscribe(charities => {
      this.charities = charities


    });



  this.charityService.listCharity().subscribe(data=>{
    this.listcharitysearch=data
  });
  this.volunteerService.listvolunteer().subscribe(data=>{
    this.listvolunteersearch=data
  });

  this._AdminService.getcharities().subscribe(
    data  => {
      this.charitydetails = data;

      

    },

    error => {

    }
  )
  }
  refresh() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        // console.log(data)
        this.ID = this.code.slice(0, 9);



      },
      error => {
        this.router.navigate(["login"]);
      }
    );
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

  onSubmit() {
  
    this.newPost.postedby = this.code
    this.postSerives.newpost(this.newPost)
      this.postSerives.getpost().subscribe(data => {
        this.Allpost = data
      })

    this.newPost.title = "",
      this.newPost.content = ""

  }

  comment() {
    this.iscomment = true;

  }

  sendcomment() {
    this.commentclass.postedby = this.code
    this.IDpost = document.getElementById('postID').innerHTML
    this.commentclass.post = this.IDpost

    this.postSerives.comment(this.commentclass)

    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.displaycomment(this.IDpost)
    this.postSerives.allcomment().subscribe(allcomment => {
      this.commentpost = allcomment
    })
  }
  like() {
    document.getElementById("like").style.color = "#3B6D8C";
    this.likeclass.postedby = this.code
    this.IDpost = document.getElementById('postID').innerHTML
    this.likeclass.post = this.IDpost

    this.postSerives.like(this.likeclass)
  }

  showlike() {
    this.IDpost = document.getElementById('postID').innerHTML
    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      this.AllLikes = likes
      this.AllLikes.postedby = this.likesPostedby
      this.postSerives.getlikesPostedby(this.likesPostedby)
      this.islike = true
    })
  }

  
  follow(charity) {

    document.getElementById(charity._id).style.display = "none";
    document.getElementById(charity.email).style.display = "block";

    if(this.code === charity._id){
      alert("you can't follow yourself")
    }
   
    

    this.postSerives.follow(this.followClass)
    
    

   }
    
    

  




  Folllowing(charityFollowing) {
  
    
    this.router.navigate(["/following",charityFollowing._id])
    this.following=true;
   
  };


  postedByvolunteer(postBY,volunteerID){
    if(postBY === volunteerID ){
      return true
    }
  };

  postedBycharity(postedBY,charityID){
    if(postedBY === charityID){
      return true
    }
  }




  charityProfile(charity) {
    this.router.navigate(['/charity/account/_id', charity])
  }

  govolunteer(volunteer) {
    console.log(volunteer);
    this.router.navigate(['home/volunteer/' + volunteer._id + '/volunteer/account']);

  }
  gocharity(charity) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
  
    this.router.navigate(['home/charity/' + charity._id + '/charity/account']);
  }

}

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
import { Charity } from '../class/charity';
declare var require: any;

@Component({
  selector: "app-charityhome",
  templateUrl: "./charityhome.component.html",
  styleUrls: ["./charityhome.component.css"]
})
export class CharityhomeComponent implements OnInit {
  createpost;
  postlikes;
  likeNo;
  public email;
  charities: unknown;
  postPostedBy: any;
  profileimageee="";
  profileimag=""
  commentByVolunteer;
  commentByCharity;
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
public charityclass =new Charity('','','','','','','','',[],[])
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

    // console.log(this.charitydetaile);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      //  console.log(typeof this.code)
      console.log(typeof params.get("_id"));
    });
    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.profileimageee= require("../../../server/upload/"+this.charitydetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
        console.log(this.charitydetaile);
      },
      error => {
        console.log(error);
        this.router.navigate(["login"]);
      }
    );

    // posts & posted by
    this.postSerives.getpost().subscribe(data=>{
      // console.log(data)
      this.Allpost=data
    
      for (let post of this.Allpost) {
        // console.log(post.postedby)
        this.postPostedBy = post.postedby

        this.postSerives.findUser(this.postPostedBy)
        // console.log(this.postPostedBy)

        this.postSerives.volunteer().subscribe(volunteer => {
          this.postedByVolunteer = volunteer
          // console.log(this.postedByVolunteer)
        })
      
        this.postSerives.charity().subscribe(charity => {
          this.postedByCharity = charity
          // console.log(this.postedByCharity)
        })
        

      }

    });

    this.postSerives.getallcharity();

    this.postSerives.charities().subscribe(charities => {
      // console.log(charities)
      this.charities = charities


    });



     // subscribe search
  this.charityService.listCharity().subscribe(data=>{
    this.listcharitysearch=data
  });
  this.volunteerService.listvolunteer().subscribe(data=>{
    this.listvolunteersearch=data
  });

  this._AdminService.getcharities().subscribe(
    data  => {
      this.charitydetails = data;
      //  console.log(data)

      
      // console.log(this.charitydetails);

    },

    error => {
      console.log("error", error);

    }
  )
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

    this.newPost.title = "",
      this.newPost.content = ""

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
        // console.log(this.commentByCharity.name);
        
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


  like(post) {
    
    // document.getElementById("like").style.color = "#3B6D8C";
    this.likeNo=true
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


  // follow
  
  follow(charity) {
console.log(charity);

    document.getElementById(charity._id).style.display = "none";
    // document.getElementById(charity.email).style.display = "block";

    if(this.code === charity._id){
      alert("you can't follow yourself")
    }
    console.log(this.charityclass.following.length);
    
    
    if(this.charityclass.following.length === 0){
      this.followClass.follower = this.code
    this.followClass.following = charity._id
      this.postSerives.follow(this.followClass)
    console.log("zero");
    
    }
    
  //  if(this.charityclass.following.length !== 0){
else{
    this.followClass.follower = this.code
    this.followClass.following = charity._id
    console.log(this.followClass)
   console.log(this.charityclass.following);

  
   
    for(let onefollowing of this.charityclass.following){
      console.log(onefollowing);
      if(onefollowing !== this.followClass.following){
        this.postSerives.follow(this.followClass)
       
      }
      else if(onefollowing == this.followClass.following){
        alert("you are already follow this charity")
      }
      // else{
      //   this.postSerives.follow(this.followClass)
      // }
      
    }
    

  
    

   }
    
    

  



  }

  Folllowing(charityFollowing) {
    console.log("ooooooooooooooo");
    console.log(charityFollowing._id);
    
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
    console.log(charity);
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(typeof params.get("_id"));
    });
  
    this.router.navigate(['home/charity/' + charity._id + '/charity/account']);
  }

}

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
import { Needs } from "../../class/needs"
import { NgForm } from '@angular/forms';
import { Listneed } from 'src/app/class/listneed';
import { async } from '@angular/core/testing';
declare var require: any;

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
  profileimageee=""
  charitydetailchanged: unknown;
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
  public showcomment = false;
public isEdit =false;
public name =true;
public address=true;
public addressEdit=false;
public phone =true;
public phoneEdit =false;
public about=true;
public aboutEdit =false;
public Country =true;
public countryedit=false;

public commentByCharity;
public commentByVolunteer ;
fileselected = "";

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
  cahritysearchlist:boolean = false;
  Voluntersearchlist:boolean = false;
  
  isadd=false;
  isupdate=false;
  need = new Needs ("","","")
  listneeds = new Listneed ("","","","")
    
   
  displaydiv = false;
  searcheng() {
    this.displaydiv = true;
  }
  
  Voluntersearch(){
    this.Voluntersearchlist = true;
    this.cahritysearchlist = false;

  }
  Charitysearch(){
    this.cahritysearchlist = true;
    this.Voluntersearchlist = false;

  }
  searcheng2(){
    this.displaydiv=false;
  }
  toggleadd(){
    this.isadd=true
   this.need.name="";
   this.need.quantity=""
   this.need.description=""


  }
  addneed(addneeds:NgForm){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.addneed(this.need,this.code).subscribe(

      response => {console.log("Success!", response)
      ,  this.isadd=false,
      addneeds.reset()
      
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
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
        }
  
      )
      

    },
        error => {
          console.log("error!", error),
          addneeds.reset()

        } 
          
    )

  }
  updateneeds(needs){

document.getElementById(needs._id).style.display="block"
this.need.name=needs.name;
this.need.quantity=needs.quantity;
this.need.description=needs.description


}
closetest(needs){
  document.getElementById(needs._id).style.display="none"

}
  updateneedss(needs,addneeds:NgForm){


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.updateneed(this.need,needs._id).subscribe(

      response => {console.log("Success!", response)
      this.isupdate=false;
      addneeds.reset()

      
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
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
          addneeds.reset()

        }
  
      )
      

    },
        error => {
          console.log("error!", error)

        } 
          
    )


  }
  deleteneeds(needs){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log( params.get("_id"));});
    this.charityService.deleteneed(needs._id).subscribe(

      response => {console.log("Success!", response)
      
      
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
    // subscribe search
      this.charityService.listCharity().subscribe(data=>{
        this.listcharitysearch=data
      });
      this.volunteerService.listvolunteer().subscribe(data=>{
        this.listvolunteersearch=data
      });
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
          console.log(this.listneeds);
        },
        error => {
          console.log(error);
        }
  
      )
      

    },
        error => {
          console.log("error!", error)

        } 
          
    )


  }
  closeview(){
    this.isadd=false
this.isupdate=false
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
        this.profileimageee= require("../../../../server/upload/"+this.charitydetaile.img.substr(12));

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
    this.volunteerService.listvolunteer().subscribe(data=>{
      this.listvolunteersearch=data
    });
    this.charityService.listneed(this.code).subscribe(
      data => {
        
        this.listneeds = data;
        this.ID = this.code.slice(0, 9);
        console.log(this.listneeds);
      },
      error => {
        console.log(error);
      }

    )
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

    // /this.newPost.postID = this.IDpost
    this.newPost.postedby = this.code

    // console.log(this.editclass)
    this.postSerives.edit(this.newPost,this.IDpost)

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

  async Comment(post) {
   
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

 
  editInformation(charityD){
   this.isEdit =true
   this.name =false


  }

  editaddress(){
    this.addressEdit=true
    this.address=false
  }

  editname(change){
   this.code
   console.log(change)
   this.postSerives.changename(this.code,change)
   console.log(this.code,change)

   this.isEdit =false
   this.name =true

   this.postSerives.changed().subscribe(data=>{
    console.log(data);
     
    data=this.charitydetailchanged
     console.log(this.charitydetailchanged);
     
   })
  }

  editaddr(change){
    this.postSerives.changeAdrress(this.code,change)
    console.log(this.code,change)
 
    this.addressEdit=false
    this.address=true
    
    this.postSerives.changed().subscribe(data=>{
     console.log(data);
    }) 

  }

  editphone(){
    this.phoneEdit=true
    this.phone=false
  }

 

  newphone(change){
    this.postSerives.changedphone(this.code,change)
    console.log(this.code,change)
 
    this.phoneEdit=false
    this.phone=true
    
    this.postSerives.changed().subscribe(data=>{
     console.log(data);
    }) 

  };


  About(){
    this.about=false
    this.aboutEdit=true
      }

      editabout(change){

        this.postSerives.changeabout(this.code,change)
        console.log(this.code,change)
     
        this.aboutEdit=false
        this.about=true
        
        this.postSerives.changed().subscribe(data=>{
         console.log(data);
        }) 
    

      }




      country(){
        this.Country=false
        this.countryedit=true
          }
    
          editcountry(change){
    
            this.postSerives.changecountry(this.code,change)
            console.log(this.code,change)
         
            this.countryedit=false
            this.Country=true
            
            this.postSerives.changed().subscribe(data=>{
             console.log(data);
            }) 
        
    
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

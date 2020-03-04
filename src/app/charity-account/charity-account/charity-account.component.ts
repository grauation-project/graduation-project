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
import { Provides } from 'src/app/class/provides';
import { Listprovide } from 'src/app/class/listprovide';
import { Changeimg } from 'src/app/class/changeimg';
import { error } from 'protractor';
import { FileUploader } from 'ng2-file-upload';
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
  postlikes;

  constructor(
    private _LoginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService,
    private charityService: CharityService,
    private volunteerService: VolunteersignupService
  ) { }
  public iscomment = false;
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
likeNo=false
public commentByCharity;
public commentByVolunteer ;
fileselected = "";
uploaded=false
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
  uploader:FileUploader
  isadd=false;
  isaddprovide=false
  isupdate=false;
  need = new Needs ("","","");
  providess = new Provides("","","")
  listneeds = new Listneed ("","","","")
  listprovide =new Listprovide("","","","")
  changeimage=new  Changeimg("")
  displaydiv = false;
  searcheng() {
    this.displaydiv = true;
  }
  showupload(){
this.uploaded=true;


  }
  onSubmitimg(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
this.charityService.changeimg(this.changeimage,this.code).subscribe(
  response=>{},
  error=>{}
)

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
   this.providess.name="";
   this.providess.quantity=""
   this.providess.description=""


  }
  toggleaddprovide(){
    this.isaddprovide=true;
    this.need.name="";
   this.need.quantity=""
   this.need.description=""
  }
  addneed(addneeds:NgForm){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      ;});
    this.charityService.addneed(this.need,this.code).subscribe(

      response => {
        this.isadd=false,
      addneeds.reset()
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
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
        },
        error => {
        }
  
      )
      

    },
        error => {
          addneeds.reset()

        } 
          
    )

  }

  addprovide(addprovides:NgForm){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      ;});
    this.charityService.addprovide(this.providess,this.code).subscribe(

      response => {
       this.isaddprovide=false,
      addprovides.reset()
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
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
      this.charityService.listprovide(this.code).subscribe(
        data => {
          
          this.listprovide = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
        }
  
      )
      this.charityService.listneed(this.code).subscribe(
        data => {
          
          this.listneeds = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
        }
  
      )
      

    },
        error => {
          addprovides.reset()

        } 
          
    )

  
    if(localStorage.getItem("id")==this.code){

      this.istrusted=true;

    }

  }
  updateneeds(needs){

document.getElementById(needs._id).style.display="block"
this.need.name=needs.name;
this.need.quantity=needs.quantity;
this.need.description=needs.description


}
updateprovides(provide){

  document.getElementById(provide._id).style.display="block"
  this.providess.name=provide.name;
  this.providess.quantity=provide.quantity;
  this.providess.description=provide.description

}
closetest(needs){
  document.getElementById(needs._id).style.display="none"

}
closetests(provide){
  document.getElementById(provide._id).style.display="none"


}
  updateneedss(needs,addneeds:NgForm){


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
     });
    this.charityService.updateneed(this.need,needs._id).subscribe(

      response => {
      this.isupdate=false;
      addneeds.reset()

      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
          this.router.navigate(["login"]);
        }
      );
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
        },
        error => {
          addneeds.reset()

        }
  
      )
      

    },
        error => {

        } 
          
    )
    this.charityService.listprovide(this.code).subscribe(
      data => {
        
        this.listprovide = data;
        this.ID = this.code.slice(0, 9);
      },
      error => {
      }

    )
    if(localStorage.getItem("id")==this.code){

      this.istrusted=true;

    }
  

  }
  updateprovidess(provide,addprovides:NgForm){


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
});
    this.charityService.updateprovide(this.providess,provide._id).subscribe(

      response => {
      this.isupdate=false;
      addprovides.reset()

      this.charityService.listprovide(this.code).subscribe(
        data => {
          
          this.listprovide = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
        }
  
      )
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
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
  

      

    },
        error => {

        } 
          
    )


  
    if(localStorage.getItem("id")==this.code){

      this.istrusted=true;

    }
  






  }
  deleteneeds(needs){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      });
    this.charityService.deleteneed(needs._id).subscribe(

      response => {
      
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
          this.router.navigate(["login"]);
        }
      );
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
        },
        error => {
        }
  
      )
      

    },
        error => {

        } 
          
    )


  }
  deleteprovides(provide){

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
});
    this.charityService.deleteprovide(provide._id).subscribe(

      response => {
      
      
      this._LoginService.charitydetails(this.code).subscribe(
        data => {
          this.charitydetaile = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
          this.router.navigate(["login"]);
        }
      );
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
        },
        error => {
        }
  
      )
      this.charityService.listprovide(this.code).subscribe(
        data => {
          
          this.listprovide = data;
          this.ID = this.code.slice(0, 9);
        },
        error => {
        }
  
      )

    },
        error => {

        } 
          
    )




  }
  closeview(){
    this.isadd=false
this.isupdate=false
  }
  closeviewprovide(){
    this.isaddprovide=false;
    this.isupdate=false

  }
  istrusted=false;
  gohome(){
    if(localStorage.getItem("name")=="volunteer"){

      this.router.navigate(["/home/volunteer/"+ localStorage.getItem("id")]);

    }
    else if(localStorage.getItem("name")=="charitiy"){

      this.router.navigate(["/home/charity/"+ localStorage.getItem("id")]);

    }
  }
  _uploaded(){
    document.getElementById('file_upload_ids').click();


  }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    
    });
    this.title = "ng8fileupload";

    this.uploader= new FileUploader({
      url: "http://localhost:3000/savethem/charity/account/img/"+this.code,
  
      itemAlias: "img"
    });
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      
    };
  

    this._LoginService.charitydetails(this.code).subscribe(
      data => {
        this.charitydetaile = data;
        this.profileimageee= require("../../../../server/upload/"+this.charitydetaile.img.substr(12));

        this.ID = this.code.slice(0, 9);
      },
      error => {
        this.router.navigate(["login"]);
      }
    );

    //charity post
    this.postSerives.getcharityid(this.code)

    this.postSerives.charityposts().subscribe(posts => {
      this.charityposts = posts
    })

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
      },
      error => {
      }

    )
    this.charityService.listprovide(this.code).subscribe(
      data => {
        
        this.listprovide = data;
        this.ID = this.code.slice(0, 9);
      },
      error => {
      }

    )
    if(localStorage.getItem("id")==this.code){

      this.istrusted=true;

    }
  



    // 
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
    this.newPost.postedby = this.code
    this.postSerives.newpostfromACC(this.newPost),
      this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      this.charityposts = allpostcharity

    })
    this.newPost.title = "",
      this.newPost.content = ""

  }






  like(post) {
    
    this.likeNo=true
    this.likeclass.postedby = this.code
    this.IDpost = post._id
    this.likeclass.post = this.IDpost

    this.postSerives.postlikes(this.IDpost)
    this.postSerives.getLikes().subscribe(likes => {
      this.AllLikes = likes

      for(let like of this.AllLikes){
        // console.log(like);
        
        if(like.post === this.IDpost && like.postedby === this.code){
          this.postSerives.removelike(this.likeclass)
          this.postSerives.postlikeslast().subscribe(likes=>{
            
          })
        }
      }
    })
    this.postSerives.like(this.likeclass)


    this.postSerives.postlikes(this.likeclass.post)
    this.postSerives.getLikes().subscribe(likes => {
      this.AllLikes = likes
     this.postlikes=this.AllLikes.length
    });


  }

  nolike(post,comment){
if(post===comment){
  return true
}
  }

  unlike(post){
    console.log(post._id);
    
    document.getElementById("like").style.color = "grey";
    
  }



  editbutton(post) {

    this.IDpost = post._id
    this.postTitle = post.title
    this.postContent = post.content

  }

  edit() {

    this.newPost.postedby = this.code

    this.postSerives.edit(this.newPost,this.IDpost)

    this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(allpostcharity => {
      this.charityposts = allpostcharity

      this.editclass.title = "",
        this.editclass.content = ""


    })

  }

  deletebutton(post) {
    this.IDpostdelete = post._id
  }
  delete() {

    this.postSerives.delete(this.IDpostdelete)
    this.postSerives.getcharityid(this.code)
    this.postSerives.charityposts().subscribe(posts => {
      this.charityposts = posts
    })
  }



 
  follow(charity) {


  }


 Comment(post) {
   
      this.IDpost = post._id
    this.postSerives.displaycomment(this.IDpost)
     this.postSerives.allcomment().subscribe(allcomment => {
      this.commentpost = allcomment

    for(let comment of this.commentpost){
        this.commentPostedBy = comment.postedby


     this.postSerives.findUser(this.commentPostedBy)

         this.postSerives.volunteer().subscribe(volunteer => {
         this.commentByVolunteer = volunteer
         
          
        })
      
        this.postSerives.charity().subscribe(charity => {
          this.commentByCharity = charity
         
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
  
    this.commentclass.postedby = this.code
    this.IDpost = post._id
    this.commentclass.post = this.IDpost

    this.postSerives.comment(this.commentclass)

    this.IDpost = post._id
    this.postSerives.displaycomment(this.IDpost)
    this.postSerives.allcomment().subscribe(allcomment => {
      this.commentpost = allcomment
      
    })


    this.commentclass.text =''
   

  }




  
  commentt(p,c) {
    
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
   this.postSerives.changename(this.code,change)
   
   this.isEdit =false
   this.name =true

   this.postSerives.changed().subscribe(data=>{
     
    data=this.charitydetailchanged
     
   })
  }
  _upload(){
    document.getElementById('file_upload_id').click();
}
  editaddr(change){
    this.postSerives.changeAdrress(this.code,change)
 
    this.addressEdit=false
    this.address=true
    
    this.postSerives.changed().subscribe(data=>{
    }) 

  }

  editphone(){
    this.phoneEdit=true
    this.phone=false
  }

 

  newphone(change){
    this.postSerives.changedphone(this.code,change)
 
    this.phoneEdit=false
    this.phone=true
    
    this.postSerives.changed().subscribe(data=>{
    }) 

  };


  About(){
    this.about=false
    this.aboutEdit=true
      }

      editabout(change){

        this.postSerives.changeabout(this.code,change)
     
        this.aboutEdit=false
        this.about=true
        
        this.postSerives.changed().subscribe(data=>{
        }) 
    

      }




      country(){
        this.Country=false
        this.countryedit=true
          }
    
          editcountry(change){
    
            this.postSerives.changecountry(this.code,change)
         
            this.countryedit=false
            this.Country=true
            
            this.postSerives.changed().subscribe(data=>{
            }) 
        
    
          }
    
  
  govolunteer(volunteer){
    this.router.navigate(['home/volunteer/'+volunteer._id+'/volunteer/account']);
    
  }
  gocharity(charity){
    this.router.navigate(['home/charity/'+charity._id+'/charity/account']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Postss } from '../class/postss';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-postsadmin',
  templateUrl: './postsadmin.component.html',
  styleUrls: ['./postsadmin.component.css']
})
export class PostsadminComponent implements OnInit {
  listpost :Postss[]=[]

  errormsg=""
  constructor(private _AdminService:AdminService) { }
  ngOnInit() {
this._AdminService.listposts().subscribe(

  data=>{

    this.listpost=data as Postss[]
  },
  error=>{
   this.errormsg="Something went wrong please try again"

  }
)
  }
clickdelete(listpost){
  this._AdminService.deletepost(listpost._id).subscribe(

    
   
        data  => {
          this.listpost = data as Postss[];
          this._AdminService.listposts().subscribe(

            data=>{
          
              this.listpost=data as Postss[]
            },
            error=>{
             this.errormsg="Something went wrong please try again"
          
            }
          )
  
        },
  
        error => {
  
        }
  )
}
}

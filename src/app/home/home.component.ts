import { Component, OnInit } from '@angular/core';
import { PostSeriveService } from '../services/post-serive.service';
import { Post } from '../class/post';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public Allpost
public newPost = new Post('','')
  connection;
post
  constructor( 
    private postSerives:PostSeriveService
  ) {}

  ngOnInit() {
   

    // this.connection=this.postSerives.getpost()


    this.postSerives.getpost().subscribe(data=>{
      // console.log(data)
      this.Allpost=data
    })
  };
 
  onSubmit(){
console.log("create")
    this.postSerives.newpost(this.newPost),
    this.postSerives.getpost().subscribe(data=>{
      console.log(data)
      this.Allpost=data
    })
    
      // this.postSerives.newpost(this.newPost).subscribe( response => console.log("Success!", response),
      // error => console.log("error", error))
      console.log(this.newPost)
       
  }
} 
  


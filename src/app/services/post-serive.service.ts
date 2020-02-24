import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Post } from '../class/post';
import { Observable, observable } from 'rxjs';
import { Emailcharity } from '../class/emailcharity';

@Injectable({
  providedIn: 'root'
})

export class PostSeriveService {
  private url="http://localhost:3000"
  private createPosturl ="http://localhost:3000/post/create";
  private getdetailsofcharity ="http://localhost:3000/post/author/"
  socket;
  constructor(
    private http:HttpClient
  ) 
  { 
    this.socket=io(this.url);
    this.socket.on("connect",()=>{
        console.log("connect")

        
      })
  }

newpostfromACC(charitypost){
  this.socket.emit("charitypost",charitypost )
}

// allCharityPost(){
//   let charityposts =new Observable(observer=>{
//     this.socket.on("allCharityPost",allpostcharity=>{
//       observer.next(allpostcharity)
//     })
//   })
//  return charityposts
// }

newpost(createpost)
{
  this.socket.emit("create post",createpost)
}


getpost(){
  let Posts= new Observable(observer=>{
  //   this.socket.on(this.url);
    this.socket.on('allPost',allpost=>{
      observer.next(allpost)
  })
  })
  return Posts
}

getcharityid(id){
  this.socket.emit("charityID",id)
}
charityposts(){
  let charityposts =new Observable(observer=>{
        this.socket.on("allcharitypost",allpostcharity=>{
          observer.next(allpostcharity)
        })
      })
     return charityposts
}
delete(idpost){
  this.socket.emit("delete",idpost)
}
edit(editpost){
  this.socket.emit("edit",editpost)
}
getpostbyid(id){
  this.socket.emit("editpost",id)
}


// getpostwilledit(){
//   let postwilledit =new Observable(observer=>{
//   this.socket.on("postthatwilledit",post=>{
//     observer.next(post)
//   })
// })
// return postwilledit
// }
comment(comment){
   this.socket.emit("createcomment",comment) 
}

like(like){
  this.socket.emit("like",like)
}

displaycomment(postid){
  this.socket.emit("displaycomment",postid)
}
allcomment(){
  let comments =new Observable(observer=>{
    this.socket.on("comments",comment=>{
      observer.next(comment)
    })
})
  return comments
}

postlikes(idpost){
this.socket.emit("ALLlikes",idpost)
}
getLikes(){
  let likes =new Observable(observer=>{
  this.socket.on("getAllLikes",like=>{
    observer.next(like)
  }) 
  })
  return likes
}

getlikesPostedby(postedbyid){
  this.socket.emit("likesPostedBy",postedbyid)
}
}

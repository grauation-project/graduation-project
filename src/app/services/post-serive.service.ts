import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Post } from '../class/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostSeriveService {
  private url="http://localhost:3000"
  private createPosturl ="http://localhost:3000/post/create";
  private getPostURL ="http://localhost:3000/post/all"
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


newpost(newPost)
{
  this.socket.emit("create post",newPost)
}
//  getposts():Observable<Post[]>{
//  return  this.http.get<Post[]>(this.getPostURL)
//  }

getpost(){

// this.socket.on('allPost',function(allpost){
//   console.log(allpost)


  let Posts= new Observable(observer=>{
  //   this.socket.on(this.url);
    this.socket.on('allPost',allpost=>{
      observer.next(allpost)
  })
  })
  return Posts
}
}
  


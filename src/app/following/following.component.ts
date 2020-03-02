import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { PostSeriveService } from '../services/post-serive.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  code: any;
  charitydetails
  followingdetails
  idfollowing: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postSerives: PostSeriveService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
      console.log(this.code)

    });

    this.postSerives.findcharity(this.code)
    this.postSerives.getcharitybyID().subscribe(data => {
      console.log(data);
      this.charitydetails = data

      for (let charityfollowing of this.charitydetails.following) {
        // console.log(charityfollowing);

        this.postSerives.getfollowing(charityfollowing);


        this.postSerives.following().subscribe(data => {
          console.log(data);
          this.followingdetails = data

        })


      }
    })

  }

  followingname(followingID, details) {
    if (followingID === details) {
      return true
    }
  };

  remove(following) {
    console.log(following);
    this.idfollowing = following

    this.postSerives.removefollow(this.idfollowing, this.code)

    this.postSerives.charityAfterRemove().subscribe(data=>{
      console.log(data)
    })
  }

}

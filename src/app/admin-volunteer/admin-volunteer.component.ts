import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Volunteer } from '../class/volunteer';

@Component({
  selector: 'app-admin-volunteer',
  templateUrl: './admin-volunteer.component.html',
  styleUrls: ['./admin-volunteer.component.css']
})
export class AdminVolunteerComponent implements OnInit {
  public code;
  public ID;
  Volunteerdetails:any =new Volunteer("","","","","","","","")
  constructor(private _AdminService : AdminService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this._AdminService.getvolunteers().subscribe(
      data  => {
        this.Volunteerdetails = data;

      },

      error => {

      }
    );
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.code = params.get("_id");
    });
  }
  deletevolunteer(Volunteerdetails){

    this._AdminService.deletevolunteer(Volunteerdetails._id).subscribe(


      response => {
    
      this._AdminService.getvolunteers().subscribe(
        data  => {
          this.Volunteerdetails = data;
  
        },
  
        error => {
  
        }
      );
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.code = params.get("_id");
      });
   
        },
    
        error => {
    
        }
      );
     

  }
}

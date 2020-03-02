import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckauthService implements CanActivate {
  constructor(private _LoginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   
    if (localStorage.getItem("token") !== null) {
      console.log("tok")
      if (localStorage.getItem("name") === "volunteer") {
        this.router.navigate(["/home/volunteer", localStorage.getItem("id")]);
        console.log(localStorage.getItem("id"));
      } else if (localStorage.getItem("name")=== "charitiy") {
        this.router.navigate(["/home/charity", localStorage.getItem("id")]);
        console.log(localStorage.getItem("id"));
      } else {
        this.router.navigate(["/admin", localStorage.getItem("id")]);
      }
      return true;
    } else if(localStorage.getItem("token")==null) {
console.log("ok")
      return true;
    }
  }
}

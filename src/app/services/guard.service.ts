import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GuardService implements CanActivate {
  constructor(private _LoginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      console.log("asd");
      this._LoginService.authorized = true;
      console.log(this._LoginService.authorized);
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

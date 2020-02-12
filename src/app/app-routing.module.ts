
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from './home/home.component';
import { CharityAccountComponent } from "./charity-account/charity-account/charity-account.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";

import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: "", component: HomeregisterationComponent },
  {path:"login",component:LoginComponent},
 {path:"home",component:HomeregisterationComponent},
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  {path:"homepage",component:HomeComponent},
  { path: "volunteer", component: VolunteerAccountComponent },
  { path: "cacharityaccount",component:CharityAccountComponent },

  { path: "cacharityaccount", component: CharityAccountComponent },
  { path: "signup", component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { LoginComponent } from "./login/login.component";
import { DonateComponent } from "./donate/donate.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { CharityAccountComponent } from "./charity-account/charity-account/charity-account.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { DonateMaterialComponent } from "./donate-material/donate-material.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: "", component: HomeregisterationComponent },
  { path: "login", component: LoginComponent },
  { path: "donate", component: DonateComponent },
  { path: "home", component: HomeregisterationComponent },
  { path: "volunteer", component: VolunteerAccountComponent },
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  { path: "cacharityaccount", component: CharityAccountComponent },
  { path: "signup", component: SignupComponent },
  { path: "donateMaterial", component: DonateMaterialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

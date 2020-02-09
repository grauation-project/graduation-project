
import { LoginComponent } from './login/login.component';
import { DonateComponent } from './donate/donate.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { DonateMaterialComponent } from './donate-material/donate-material.component';

  
const routes: Routes = [
  { path: "", component: HomeregisterationComponent },
  {path:"login",component:LoginComponent},
 {path:"donate",component:DonateComponent},
  { path: "home", component: HomeregisterationComponent },
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  {path:"donateMaterial",component:DonateMaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

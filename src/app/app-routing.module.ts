import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";

const routes: Routes = [
  { path: "", component: HomeregisterationComponent },

  { path: "home", component: HomeregisterationComponent },
  { path: "volunteer", component: VolunteerAccountComponent },
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

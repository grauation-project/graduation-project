import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { CharityAccountComponent } from './charity-account/charity-account/charity-account.component';

const routes: Routes = [
  { path: "", component: HomeregisterationComponent },

  { path: "home", component: HomeregisterationComponent },
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  { path: "cacharityaccount",component:CharityAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

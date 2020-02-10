
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from './home/home.component';


  
const routes: Routes = [
  { path: "", component: HomeregisterationComponent },
  {path:"login",component:LoginComponent},
 {path:"home",component:HomeregisterationComponent},
  { path: "about", component: AboutusComponent },
  { path: "contact", component: ContactComponent },
  {path:"homepage",component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

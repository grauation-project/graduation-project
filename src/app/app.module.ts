import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DonateComponent } from "./donate/donate.component";
import { LoginComponent } from "./login/login.component";
import { from } from "rxjs";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from "./contact/contact.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { DonateMaterialComponent } from "./donate-material/donate-material.component";

@NgModule({
  declarations: [
    AppComponent,
    DonateComponent,
    LoginComponent,
    NavbarComponent,
    HomeregisterationComponent,
    AboutusComponent,
    HowitworkComponent,
    ContactComponent,
    VolunteerAccountComponent,
    DonateMaterialComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

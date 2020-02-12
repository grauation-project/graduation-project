import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { from } from "rxjs";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeregisterationComponent } from "./homeregisteration/homeregisteration.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { HowitworkComponent } from "./howitwork/howitwork.component";
import { ContactComponent } from './contact/contact.component';
import { CharityAccountComponent } from './charity-account/charity-account/charity-account.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { SignupComponent } from './signup/signup.component';
import { VolunteersignupService } from './services/volunteersignup.service';
import{HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeregisterationComponent,
    AboutusComponent,
    HowitworkComponent,
    ContactComponent,
    CharityAccountComponent,
    FooterComponent,
    HomeComponent,
    VolunteerAccountComponent,
    SignupComponent,
   VolunteersignupService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

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
import { ContactComponent } from "./contact/contact.component";
import { CharityAccountComponent } from "./charity-account/charity-account/charity-account.component";
import { FooterComponent } from "./footer/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { VolunteerAccountComponent } from "./volunteer-account/volunteer-account.component";
import { SignupComponent } from "./signup/signup.component";
import { HttpClientModule } from "@angular/common/http";
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { VolunteersignupService } from "./services/volunteersignup.service";
import { PaymentService } from "./services/payment.service";
import { ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import { DonationComponent } from "./donation/donation.component";
import { CongrateComponent } from "./congrate/congrate.component";
import { CharityhomeComponent } from './charityhome/charityhome.component';

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
    DashBoardComponent,
    DonationComponent,
    CongrateComponent,
    CharityhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule
  ],

  providers: [VolunteersignupService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DonateComponent } from './donate/donate.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"donate",component:DonateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

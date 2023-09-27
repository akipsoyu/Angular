import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { HakkimizdaComponent } from './pages/hakkimizda/hakkimizda.component';
import { LoginComponent } from './pages/login/login.component';
import {RegisterComponent} from "./pages/register/register.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: '', component: AnasayfaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hakkimizda', component: HakkimizdaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

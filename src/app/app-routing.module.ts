import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { HakkimizdaComponent } from './pages/hakkimizda/hakkimizda.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: AnasayfaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hakkimizda', component: HakkimizdaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

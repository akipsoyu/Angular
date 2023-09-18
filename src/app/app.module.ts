import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { LoginComponent } from './pages/login/login.component';
import { HakkimizdaComponent } from './pages/hakkimizda/hakkimizda.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AnasayfaComponent,
    LoginComponent,
    HakkimizdaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

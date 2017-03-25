import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';

import { OwnerComponent } from './components/owner/owner.component';
import { OwnerSignupComponent } from './components/owner/owner-signup.component';
import { OwnerCarDetailComponent } from './components/owner/owner-car-detail.component';
import { OwnerCarListComponent } from './components/owner/owner-car-list.component';

import { CarComponent } from './components/car/car.component';

import {OwnerService} from './services/owner.service';
import {CarService} from './services/car.service';
import {UrlService} from './services/url.service';

import { OwnerLoginComponent } from './components/owner/owner-login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerSettingsComponent } from './components/owner/owner-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    CarComponent,
    OwnerSignupComponent,
    OwnerCarDetailComponent,
    OwnerCarListComponent,
    OwnerLoginComponent,
    HeaderComponent,
    HomeComponent,
    OwnerSettingsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [          
    OwnerService,
    CarService,
    UrlService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

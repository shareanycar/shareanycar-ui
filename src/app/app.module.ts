import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';

import { OwnerComponent } from './components/owner/owner.component';
import { OwnerCarDetailComponent } from './components/owner/owner-car-detail.component';
import { OwnerCarListComponent } from './components/owner/owner-car-list.component';

import { CarComponent } from './components/car/car.component';

import {OwnerService} from './services/owner.service';
import {CarService} from './services/car.service';
import {ImageService} from './services/image.service';
import {HeaderService} from './services/header.service';
import {LocationService} from './services/location.service';

import { OwnerLoginComponent } from './components/owner/owner-login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerCarImageComponent } from './components/owner/owner-car-image.component';
import { OwnerImageDetailComponent } from './components/owner/owner-image-detail.component';
import { OwnerDetailComponent } from './components/owner/owner-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    OwnerComponent,
    CarComponent,
    OwnerCarDetailComponent,
    OwnerCarListComponent,
    OwnerLoginComponent,
    HeaderComponent,
    HomeComponent,
    OwnerCarImageComponent,
    OwnerImageDetailComponent,
    OwnerDetailComponent
    
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
    ImageService,
    HeaderService,
    LocationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

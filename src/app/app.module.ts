import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app-routing.module';

import {UserService} from './services/user.service';
import {CarService} from './services/car.service';
import {ImageService} from './services/image.service';
import {HeaderService} from './services/header.service';
import {LocationService} from './services/location.service';
import { HeaderComponent } from './components/header.component';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';
import { ListCarComponent } from './components/list-car.component';
import { MyCarsComponent } from './components/my-cars.component';
import { ManageComponent } from './components/manage.component';
import { ManageMenuComponent } from './components/manage-menu.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { ProfileComponent } from './components/profile.component';
import { CarDetailComponent } from './components/car-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ListCarComponent,
    MyCarsComponent,
    ManageComponent,
    ManageMenuComponent,
    ChangePasswordComponent,
    ProfileComponent,
    CarDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [          
    UserService,
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

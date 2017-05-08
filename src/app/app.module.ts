import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import { CarService } from './services/car.service';
import { ImageService } from './services/image.service';
import { HeaderService } from './services/header.service';
import { LocationService } from './services/location.service';
import { MessageService } from './services/message.service';
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
import { DatepickerModule, CarouselModule } from 'ngx-bootstrap';
import { FindCarsComponent } from './components/find-cars.component';
import { RentCarComponent } from './components/rent-car.component';
import { SendMessageComponent } from './components/send-message.component';
import { FooterComponent } from './components/footer.component';
import { IncomingMessagesComponent } from './components/incoming-messages.component';
import { OutgoingMessagesComponent } from './components/outgoing-messages.component';
import { ReadMessageComponent } from './components/read-message.component';
import { MyMessagesComponent } from './components/my-messages.component';
import { MyMessagesMenuComponent } from './components/my-messages-menu.component';
import { OwnerBookingsComponent } from './components/owner-bookings.component';
import { MyBookingsComponent } from './components/my-bookings.component';
import { ClientBookingsComponent } from './components/client-bookings.component';
import { MyBookingsMenuComponent } from './components/my-bookings-menu.component';


@NgModule( {
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
        FindCarsComponent,
        RentCarComponent,
        SendMessageComponent,
        FooterComponent,
        IncomingMessagesComponent,
        OutgoingMessagesComponent,
        ReadMessageComponent,
        MyMessagesComponent,
        MyMessagesMenuComponent,
        OwnerBookingsComponent,
        MyBookingsComponent,
        ClientBookingsComponent,
        MyBookingsMenuComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        CarouselModule.forRoot(),
        DatepickerModule.forRoot(),
    ],
    providers: [
        UserService,
        CarService,
        ImageService,
        HeaderService,
        LocationService,
        MessageService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

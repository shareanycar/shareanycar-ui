import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';
import { ListCarComponent } from './components/list-car.component';
import { ManageComponent } from './components/manage.component';
import { ManageMenuComponent } from './components/manage-menu.component';
import { MyCarsComponent } from './components/my-cars.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { ProfileComponent } from './components/profile.component';
import { CarDetailComponent } from './components/car-detail.component';
import { FindCarsComponent } from './components/find-cars.component';
import { RentCarComponent } from './components/rent-car.component';
import {SendMessageComponent} from './components/send-message.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '', outlet: 'header', component: HeaderComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'listCar', component: ListCarComponent },
    { path: 'findCars', component: FindCarsComponent },
    { path: 'rentCar/:id', component: RentCarComponent },
    {
        path: 'manage', component: ManageComponent, children: [
            { path: '', component: ManageMenuComponent, outlet: 'manage-menu' },
            { path: 'myCars', component: MyCarsComponent },
            { path: 'changePassword', component: ChangePasswordComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'carDetail/:id', component: CarDetailComponent },
            { path: 'sendMessage/:id', component: SendMessageComponent }
        ]
    }
];


@NgModule( {
    imports: [
        RouterModule.forRoot( routes )
    ],

    exports: [RouterModule]

})
export class AppRoutingModule { }

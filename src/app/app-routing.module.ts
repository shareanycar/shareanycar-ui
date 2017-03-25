import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent }   from './components/car/car.component';
import { OwnerComponent }      from './components/owner/owner.component';
import { OwnerSettingsComponent }      from './components/owner/owner-settings.component';
import { OwnerSignupComponent }      from './components/owner/owner-signup.component';
import { OwnerLoginComponent }      from './components/owner/owner-login.component';
import { OwnerCarDetailComponent }      from './components/owner/owner-car-detail.component';
import { OwnerCarListComponent }      from './components/owner/owner-car-list.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
                        { path: '', redirectTo: '/home', pathMatch: 'full' },
                        { path: 'home', component: HomeComponent },
                        { path: '', outlet:'header' , component: HeaderComponent}
                        ];

const ownerRoutes: Routes = [
                        { path: 'owner',  component: OwnerComponent },
                        { path: 'owner/signup',  component: OwnerSignupComponent },
                        { path: 'owner/login',  component: OwnerLoginComponent },
                        { path: 'owner/addcar',  component: OwnerCarDetailComponent },
                        { path: 'owner/cardetail/:id',  component: OwnerCarDetailComponent },
                        { path: 'owner/cars',  component: OwnerCarListComponent },
                        { path: 'owner/settings',  component: OwnerSettingsComponent },
                        
                      ];

const carRoutes: Routes = [
                           { path: 'car',  component: CarComponent}
                          ];

@NgModule({
    imports: [ 
               RouterModule.forRoot(routes),
               RouterModule.forRoot(ownerRoutes),
               RouterModule.forRoot(carRoutes)
               ],
               
    exports: [ RouterModule ]
  
})
export class AppRoutingModule { }
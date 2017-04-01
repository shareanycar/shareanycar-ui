import { Component, OnInit } from '@angular/core';
import { Car } from '../../dto/car';
import { OwnerService } from '../../services/owner.service';
import { CarService } from '../../services/car.service';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location as Nav} from '@angular/common';
import { Location} from '../../dto/location';

@Component( {
    selector: 'app-owner-car-detail',
    templateUrl: './owner-car-detail.component.html',
    styleUrls: ['./css/owner-car-detail.component.css']
})
export class OwnerCarDetailComponent implements OnInit {
    car: Car;
    errorMsg: string;
    isNew: boolean;
    carId: number;
    countries: string[];
    cities: string[];
    locations: Location[];
    transmissionTypes: string[] = [];
    fuelTypes: string[] = [];
    carTypes: string[] = [];

    constructor
        (
        private ownerService: OwnerService,
        private carService: CarService,
        private route: ActivatedRoute,
        private nav: Nav,
        private router: Router,
        private locationService: LocationService
        ) { }

    ngOnInit() {

        if ( !this.ownerService.isLoggedIn() ) {
            this.router.navigate( ['owner'] );
            return;
        }


        this.route
            .params
            .subscribe(( params: Params ) => {
                if ( params['id'] != null ) {
                    this.carId = params['id'];
                    this.isNew = false;
                } else {
                    this.car = new Car;
                    this.isNew = true;
                }

            });
        
          Promise.all([
              this.locationService.all(),
              this.carService.transmissionTypes(),
              this.carService.fuelTypes(),
              this.carService.carTypes()
           ]).then((results:any[]) =>{
               this.locations = results[0];
               results[1].forEach((elem) => this.transmissionTypes.push(elem.name));
               results[2].forEach((elem) => this.fuelTypes.push(elem.name))
               results[3].forEach((elem) => this.carTypes.push(elem.name))
               
               this.countries = this.locationService.countries(this.locations);
               
               if(this.isNew){
                   this.car = new Car;                   
                   this.car.locationCountry = this.countries[0];
                   this.cities = this.locationService.cities(this.car.locationCountry, this.locations);
                   this.car.locationCity = this.cities[0];
                   this.car.transmissionTypeName = this.transmissionTypes[0];
                   this.car.fuelTypeName = this.fuelTypes[0];
                   this.car.carTypeName = this.carTypes[0];
               }else{
                  
                   this.carService.detail(this.carId)
                   .then((car) => {
                       this.car = car;
                       this.cities = this.locationService.cities(this.car.locationCountry, this.locations);
                   });                
               }
           });
          
    }

    change() {
        this.cities = this.locationService.cities( this.car.locationCountry, this.locations );
    }
    
    create(): void {
        this.carService
            .create( this.car )
            .then(() => this.router.navigate( ['owner/cars'] ) )
            .catch(() => this.errorMsg = "problem creating car" );
    }

    update(): void {
        this.carService
            .update( this.car )
            .then(() => this.errorMsg = "car has been updated" )
            .catch(() => this.errorMsg = "problem updating car" );
    }

    delete(): void {
        this.carService
            .delete( this.car.id )
            .then(() => this.nav.back() )
            .catch(() => this.errorMsg = "problem removing car" );

    }

}

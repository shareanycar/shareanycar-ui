import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { CarService } from '../services/car.service';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';
import { Car } from '../dto/car';
import { Location } from '../dto/location';
import { AppSettings } from '../appSettings';

import { FileUploader } from 'ng2-file-upload';



@Component( {
    selector: 'app-list-car',
    templateUrl: './html/list-car.component.html',
    styleUrls: ['./css/list-car.component.css']
})
export class ListCarComponent implements OnInit {

    constructor(
        private headerService: HeaderService,
        private userService: UserService,
        private carService: CarService,
        private locationService: LocationService,
        private router: Router
    ) { }

    car: Car;
    locations: Location[] = [];
    insurers: string[] = [];
    manufacturers: string[] = [];
    countries: string[] = [];
    cities: string[] = [];
    transmissionTypes: string[] = [];
    numberOfSeats: number[] = [];
    fuelTypes: string[] = [];
    carTypes: string[] = [];
    errorMsg: string;


    uploader: FileUploader;


    ngOnInit() {
        if ( !this.userService.isLoggedIn() ) {
            this.router.navigate( ['login'] );
        }
        this.car = new Car;
        this.car.defaultAvailability = 'AVAILABLE'; 

        this.uploader = new FileUploader( {});

        Promise.all( [
            this.locationService.all(),
            this.carService.transmissionTypes(),
            this.carService.fuelTypes(),
            this.carService.carTypes(),
            this.carService.manufacturers(),
            this.carService.insurers()
        ] ).then(( results: any[] ) => {

            this.locations = results[0];

            results[1].forEach(( elem ) => this.transmissionTypes.push( elem.name ) );
            results[2].forEach(( elem ) => this.fuelTypes.push( elem.name ) );
            results[3].forEach(( elem ) => this.carTypes.push( elem.name ) );
            results[4].forEach(( elem ) => this.manufacturers.push( elem.name ) );
            results[5].forEach(( elem ) => this.insurers.push( elem.name ) );

            this.countries = this.locationService.countries( this.locations );

            this.car.locationCountry = this.countries[0];
            this.cities = this.locationService.cities( this.car.locationCountry, this.locations );
            this.car.locationCity = this.cities[0];
            this.car.transmissionTypeName = this.transmissionTypes[0];
            this.car.fuelTypeName = this.fuelTypes[0];
            this.car.carTypeName = this.carTypes[0];
            this.car.manufacturerName = this.manufacturers[0];
            this.car.insurerName = this.insurers[0];
            this.numberOfSeats = this.numberOfSeats.concat( [2, 3, 4, 5, 6, 7, 8] );

        });
    }

    changeCountry() {
        this.cities = this.locationService.cities( this.car.locationCountry, this.locations );
        this.car.locationCity = this.cities[0];
    }

    create() {
        console.log(this.car.defaultAvailability);
        this.carService
            .create( this.car )
            .then(( id ) => {
                this.uploader.setOptions( {
                    url: AppSettings.API_ENDPOINT + "image/car/" + id + "/main", authToken: this.headerService.authToken()
                });

                this.uploader.uploadAll();

                this.uploader.onCompleteAll = () => {
                    this.router.navigate( ['manage', 'myCars'] );
                }

            })
            .catch(() => this.errorMsg = "can not create car" );

    }

}

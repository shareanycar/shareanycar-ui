import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../dto/car';
import { Property } from '../dto/property';
import { LocationService } from '../services/location.service';
import { Location } from '../dto/location';

@Component( {
    selector: 'app-find-cars',
    templateUrl: './html/find-cars.component.html',
    styleUrls: ['./css/find-cars.component.css']
})
export class FindCarsComponent implements OnInit {

    cars: Car[];

    locations: Location[] = [];

    countries: string[] = [];
    country: string;

    cities: string[] = [];
    city: string;

    carTypes: string[] = [];
    carType: string;

    transmissionTypes: string[] = [];
    transmissionType: string;

    numberOfSeats: string[] = [];
    seat: string;

    constructor(
        private carService: CarService,
        private locationService: LocationService
    ) { }

    ngOnInit() {
        Promise.all( [
            this.carService.availableCars(),
            this.carService.carTypes(),
            this.carService.transmissionTypes(),
            this.locationService.all()
        ] ).then(( results: any[] ) => {
            this.cars = results[0];
            results[1].forEach(( elem: Property ) => this.carTypes.push( elem.name ) );
            results[2].forEach(( elem: Property ) => this.transmissionTypes.push( elem.name ) );

            this.locations = this.locations.concat( [new Location( -1, null, null )] );
            this.locations = this.locations.concat( results[3] );

            this.countries = this.locationService.countries( this.locations );
            this.country = this.countries[0];
            this.cities = this.locationService.cities( this.country, this.locations );
            this.numberOfSeats = this.numberOfSeats.concat( ['2', '3', '4', '5', '6', '7', '8+'] );

        });
    }

    changeCountry() {
        this.cities = this.locationService.cities( this.country, this.locations );
        this.city = this.cities[0];
    }

}

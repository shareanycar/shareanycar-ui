import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../dto/car';

@Component( {
    selector: 'app-find-cars',
    templateUrl: './find-cars.component.html',
    styleUrls: ['./css/find-cars.component.css']
})
export class FindCarsComponent implements OnInit {

    cars: Car[];
    
    countries: string[];
    country: string[];
    
    cities: string[];
    city: string[];
    
    carTypes: string[];
    carType: string[];
    

    constructor( private carService: CarService ) { }

    ngOnInit() {
        Promise.all( [
            this.carService.availableCars(),
            
        ] ).then((results: any[]) =>{
            this.cars = results[0];
        });
    }

}

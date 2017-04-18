import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../dto/car';
import { Property } from '../dto/property';

@Component( {
    selector: 'app-find-cars',
    templateUrl: './html/find-cars.component.html',
    styleUrls: ['./css/find-cars.component.css']
})
export class FindCarsComponent implements OnInit {

    cars: Car[];
    
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
    

    constructor( private carService: CarService ) { }

    ngOnInit() {
        Promise.all( [
            this.carService.availableCars(),
            this.carService.carTypes(),
            this.carService.transmissionTypes()
        ] ).then((results: any[]) =>{
            this.cars = results[0];
            results[1].forEach((elem: Property) => this.carTypes.push(elem.name));
            results[2].forEach((elem: Property) => this.transmissionTypes.push(elem.name));
            this.numberOfSeats = this.numberOfSeats.concat(['2','3','4','5','6','7', '8+']);
        });
    }

}

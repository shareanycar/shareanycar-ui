import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { ImageService } from '../services/image.service';
import { Image } from '../dto/image';
import { Car } from '../dto/car';

@Component( {
    selector: 'app-rent-car',
    templateUrl: './rent-car.component.html',
    styleUrls: ['./css/rent-car.component.css']
})
export class RentCarComponent implements OnInit {

    constructor(
        private carService: CarService,
        private imageService: ImageService,
        private activatedRoute: ActivatedRoute
    ) { }

    carId: number;
    car: Car;
    images: Image[];

    ngOnInit() {
        this.activatedRoute.params.subscribe(( params: Params ) => this.carId = params['id'] );

        Promise.all( [
            this.carService.detail( this.carId ),
            this.imageService.carImages( this.carId )
        ] ).then(( results: any[] ) => {
            this.car = results[0];
            this.images = results[1];
        })

    }

}

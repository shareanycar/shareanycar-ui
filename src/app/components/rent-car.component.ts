import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { ImageService } from '../services/image.service';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Image } from '../dto/image';
import { Car } from '../dto/car';
import { Booking } from '../dto/booking';

@Component( {
    selector: 'app-rent-car',
    templateUrl: './html/rent-car.component.html',
    styleUrls: ['./css/rent-car.component.css']
})
export class RentCarComponent implements OnInit {

    showDatePickerStart: boolean;
    showDatePickerEnd: boolean;
    booking: Booking = new Booking;
    errMsg: string;

    constructor(
        private carService: CarService,
        private imageService: ImageService,
        private bookingService: BookingService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    carId: number;
    car: Car;
    images: Image[];

    ngOnInit() {
        this.activatedRoute.params.subscribe(( params: Params ) => this.carId = params['id'] );

        this.booking.carId = this.carId;
        
        Promise.all( [
            this.carService.detail( this.carId ),
            this.imageService.carImages( this.carId )
        ] ).then(( results: any[] ) => {
            this.car = results[0];
            this.images = results[1];
        });
    }

    book(): any {
        if(this.userService.isLoggedIn()){
            console.log(this.booking);
            this.bookingService.book( this.carId, this.booking )
            .then(() => this.router.navigate(['manage/bookings/client']))
            .catch(() => this.errMsg = "error booking a car") ;           
        }else{           
            this.errMsg = "login to book a car";
        }
    }
}

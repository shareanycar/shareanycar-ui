import { Component, OnInit } from '@angular/core';
import { Booking } from '../dto/booking';
import { BookingService } from '../services/booking.service';

@Component( {
    selector: 'app-client-bookings',
    templateUrl: './html/client-bookings.component.html',
    styleUrls: ['./css/client-bookings.component.css']
})
export class ClientBookingsComponent implements OnInit {

    bookings: Booking[];

    constructor( private bookingService: BookingService ) { }

    ngOnInit() {
        Promise.all( [
            this.bookingService.clientBookings()
        ] ).then(( results: any[] ) => {
            this.bookings = results[0];
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { Booking } from '../dto/booking';
import { BookingService } from '../services/booking.service';

@Component( {
    selector: 'app-owner-bookings',
    templateUrl: './html/owner-bookings.component.html',
    styleUrls: ['./css/owner-bookings.component.css']
})
export class OwnerBookingsComponent implements OnInit {

    bookings: Booking[];

    constructor( private bookingService: BookingService ) { }
    
    ngOnInit() {
        Promise.all( [
            this.bookingService.ownerBookings()
        ] ).then(( results: any[] ) => {
            this.bookings = results[0];
        });
    }
    
}

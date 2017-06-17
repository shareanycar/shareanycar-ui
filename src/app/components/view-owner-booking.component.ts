import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Booking } from '../dto/booking';
import { Car } from '../dto/car';
import { Message } from '../dto/message';
import { BookingService } from '../services/booking.service';
import { CarService } from '../services/car.service';
import { MessageService } from '../services/message.service';

@Component( {
    selector: 'app-view-owner-booking',
    templateUrl: './html/view-owner-booking.component.html',
    styleUrls: ['./css/view-owner-booking.component.css']
})
export class ViewOwnerBookingComponent implements OnInit {

    constructor(
        private bookingService: BookingService,
        private carService: CarService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) { }

    booking: Booking;
    bookingId: number;
    car: Car;
    text: string;
    errMsgConfirm: string;
    errMsgSendMsg: string;

    ngOnInit() {
        this.activatedRoute.params.subscribe(( params: Params ) => this.bookingId = params['id'] );
        this.bookingService.viewBooking( this.bookingId ).then(( booking ) => {
            this.booking = booking;
            this.carService.detail( this.booking.carId ).then(( car ) => {
                this.car = car;
            })
        });
    }

    makeMessage( text: string ): Message {
        let message: Message = new Message;
        message.title =
            "booking: " +
            "[" + this.car.manufacturerName + " " + this.car.modelName + "]" +
            this.booking.dateFrom + " - " +
            this.booking.dateTo;

        message.text = text;
        message.toUserId = this.booking.clientId;
        message.toUserName = this.booking.clientName;

        return message;
    }

    confirm(): any {
        this.bookingService.confirmBooking( this.bookingId )
            .then(() => {
                this.errMsgConfirm = "booking has been confirmed";
            })
            .catch(() => this.errMsgConfirm = "problem confirming booking" );
    }

    send(): any {
        let message: Message = this.makeMessage( this.text );

        this.messageService.send( message )
            .then(() => this.errMsgSendMsg = "message has been sent" )
            .catch(() => this.errMsgSendMsg = "problem sending message" );
    }
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HeaderService } from './header.service';
import { AppSettings } from '../appSettings';
import { Booking } from '../dto/booking';

@Injectable()
export class BookingService {

    constructor( private http: Http, private headerService: HeaderService ) { }

    book( carId: number, booking: Booking ): Promise<any> {
        return this.http
            .post( AppSettings.API_ENDPOINT + "book/car/" + carId, JSON.stringify( booking ), { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    carBookings( carId: number ): Promise<Booking[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "book/car/" + carId, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    ownerBookings(): Promise<Booking[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "book/owner", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    clientBookings(): Promise<Booking[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "book/client", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    viewBooking( id: number ): Promise<Booking> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "book/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    confirmBooking( id: number ): Promise<any> {
        return this.http
            .put( AppSettings.API_ENDPOINT + "book/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    cancelBooking( id: number ): Promise<any> {
        return this.http
            .delete( AppSettings.API_ENDPOINT + "book/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}

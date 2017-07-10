import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { Headers, Http } from '@angular/http';
import { AppSettings } from '../appSettings';
import { CarAvailability } from '../dto/car-availability';

@Injectable()
export class CarAvailabilityService {

    constructor( private headerService: HeaderService, private http: Http ) { }

    carAvailability( carId: number ): Promise<CarAvailability[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "availability/" + carId, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    setCarAvailable( carId: number, fromDate: string, toDate: string ): Promise<any> {
        return this.http
            .post( AppSettings.API_ENDPOINT + "availability/" + carId + "/" + fromDate + "/" + toDate, { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    setCarUnavailable( carId: number, fromDate: string, toDate: string ): Promise<any> {
        return this.http
            .delete( AppSettings.API_ENDPOINT + "availability/" + carId + "/" + fromDate + "/" + toDate, { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error );
        return Promise.reject( error.message || error );
    }

}

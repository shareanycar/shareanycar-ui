import { Injectable } from '@angular/core';
import { Image } from '../dto/image';
import { Headers, Http } from '@angular/http';
import { HeaderService } from "./header.service";
import { AppSettings } from "../appSettings";

@Injectable()
export class ImageService {

    constructor( private http: Http, private headerService: HeaderService ) { }

    carImages( carId: number ): Promise<Image[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "image/car/" + carId, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    carImage( carId: number, imageId: number ): Promise<Image> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "image/" + imageId + "/car/" + carId, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    deleteCarImage( carId: number, imageId: number ): Promise<any> {
        return this.http
            .delete( AppSettings.API_ENDPOINT + "image/" + imageId + "/car/" + carId, { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    deleteUserImage(): Promise<any> {
        return this.http
            .delete( AppSettings.API_ENDPOINT + "image/user", { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );

    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }
}

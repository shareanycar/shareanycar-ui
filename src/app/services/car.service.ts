import { Injectable } from '@angular/core';
import { Car } from '../dto/car';
import { Headers, Http } from '@angular/http';
import { HeaderService } from './header.service';
import { Image } from '../dto/image';
import { Property } from '../dto/property';
import { AppSettings } from '../appSettings';

@Injectable()
export class CarService {

    constructor( private http: Http, private headerService: HeaderService ) { }

    create( car: Car ): Promise<any> {
        return this.http
            .post( AppSettings.API_ENDPOINT + "car", JSON.stringify( car ), { headers: this.headerService.headers() })
            .toPromise()
            .then(res => res.json() )
            .catch( this.handleError );
    }

    detail( id: number ): Promise<Car> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "car/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );

    }

    update( car: Car ): Promise<any> {
        return this.http
            .put( AppSettings.API_ENDPOINT + "car/" + car.id, JSON.stringify( car ), { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    delete( id: number ): Promise<any> {
        return this.http
            .delete( AppSettings.API_ENDPOINT + "car/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    getAll(): Promise<Car[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "car/all", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    transmissionTypes(): Promise<Property> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "property/transmission", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    fuelTypes(): Promise<Property> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "property/fuel", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    carTypes(): Promise<Property> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "property/car", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }
    
    manufacturers(): Promise<Property> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "property/manufacturer", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }
    
    insurers(): Promise<Property> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "property/insurer", { headers: this.headerService.headers() })
            .toPromise()
            .then( res => res.json() )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }
}

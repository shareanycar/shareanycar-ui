import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable()
export class UrlService {

    baseUrl: string = "http://localhost:8080/api/";
    header: Headers = new Headers( {
        'Content-Type': 'application/json'
    });

    token: string;

    authToken(): string {
        return this.token;
    }

    constructor() { }

    ownerCRUD(): string {
        return this.baseUrl + "owner";
    }

    ownerAuth(): string {
        return this.baseUrl + "auth/owner";
    }

    ownerPasswordUpdate(): string {
        return this.baseUrl + "owner/password";
    }


    carCreate(): string {
        return this.baseUrl + "car";
    }

    carDetail( id: string ): string {
        return this.baseUrl + "car/" + id;
    }

    carUpdate( id: number ): string {
        return this.baseUrl + "car/" + id;
    }
    carDelete( id: number ) {
        return this.baseUrl + "car/" + id;
    }

    carImages( id: number ) : string{
        return this.baseUrl + "image/car/" + id;
    }

    carImage(carId: number, imageId: number): string{
        return this.baseUrl + "image/" + imageId + "/car/" + carId;
    }
    
    
    carAll(): string {
        return this.baseUrl + "car/all";
    }

    carImageUpload( id: number ): string {
        return this.baseUrl + "image/car/" + id;
    }

    customerAuth(): string {
        return this.baseUrl + "auth/customer";
    }

    customerPasswordUpdate(): string {
        return this.baseUrl + "customer/password";
    }

    headers(): Headers {
        return this.header;
    }

    headerAddAuthToken( token: string ): void {
        this.header = new Headers( {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        this.token = 'Bearer ' + token;

    }

    clearHeader(): void {
        this.header = new Headers( {
            'Content-Type': 'application/json'
        });

        this.token = '';
    }

}

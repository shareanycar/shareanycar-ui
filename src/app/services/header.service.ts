import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable()
export class HeaderService {

    constructor() { }

    header: Headers = new Headers( {
        'Content-Type': 'application/json'
    });

    token: string;

    authToken(): string {
        return this.token;
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

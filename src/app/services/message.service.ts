import { Injectable } from '@angular/core';
import { Message } from '../dto/message';
import { Headers, Http } from '@angular/http';
import { HeaderService } from './header.service';
import { AppSettings } from '../appSettings';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService {

    constructor(
        private http: Http,
        private headerService: HeaderService
    ) { }

    send( m: Message ): Promise<any> {
        return this.http
            .post( AppSettings.API_ENDPOINT + "message/send", JSON.stringify(m), { headers: this.headerService.headers() })
            .toPromise()
            ;
    }

    read( id: number ): Promise<Message> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "message/read/" + id, { headers: this.headerService.headers() })
            .toPromise()
            .then(( r ) => r.json() )
            .catch( this.handleError );
    }

    incoming(): Promise<Message[]> {
        return this.http
            .get( AppSettings.API_ENDPOINT + "message/incoming", { headers: this.headerService.headers() })
            .toPromise()
            .then(( r ) => r.json() )
            .catch( this.handleError );
    }

    outgoing(): Promise<Message[]> {
        return this.http
        .get(AppSettings.API_ENDPOINT + "message/outgoing", {headers: this.headerService.headers()})
        .toPromise()
        .then((r) => r.json())
        .catch(this.handleError);
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error );
        return Promise.reject( error.message || error );
    }
}

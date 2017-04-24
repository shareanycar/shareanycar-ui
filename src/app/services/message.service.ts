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
            .post( AppSettings.API_ENDPOINT + "message/send", JSON.stringify( m ), { headers: this.headerService.headers() })
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
            .get( AppSettings.API_ENDPOINT + "message/outgoing", { headers: this.headerService.headers() })
            .toPromise()
            .then(( r ) => r.json() )
            .catch( this.handleError );
    }

    remove( msgs: Message[] ): Promise<any> {
        return this.http
            .post( AppSettings.API_ENDPOINT + "message/delete", JSON.stringify( msgs ), { headers: this.headerService.headers() })
            .toPromise()
            .catch( this.handleError );
    }

    markedMessages( msgs: Message[], marked: boolean[] ): Message[] {
        let markedMsgs: Message[] = [];
        let i: number;
        for ( i = 0; i < msgs.length; i++ ) {
            if ( marked[i] ) {
                markedMsgs = markedMsgs.concat( [msgs[i]] );
            }
        }
        return markedMsgs;
    }

    remainingMessages( msgs: Message[], marked: boolean[] ): Message[] {
        let remainingMessages: Message[] = [];
        let i: number;
        for ( i = 0; i < msgs.length; i++ ) {
            if ( !marked[i] ) {
                remainingMessages = remainingMessages.concat( [msgs[i]] );
            }
        }
        return remainingMessages;
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error );
        return Promise.reject( error.message || error );
    }
}

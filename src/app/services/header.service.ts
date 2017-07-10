import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { CookieService } from 'ng2-cookies';


@Injectable()
export class HeaderService {

    constructor(private cookieService: CookieService) { }

    header: Headers = new Headers( {
        'Content-Type': 'application/json'
    });

    token: string;
    
    authToken(): string {
        if(this.cookieService.check("token")){
            this.token = 'Bearer ' + this.cookieService.get("token");
        }
        return this.token;
    }

    headers(): Headers {
        if(this.cookieService.check("token")){
            this.header = new Headers( {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.cookieService.get("token")
            });
        }
        return this.header;
    }

    headerAddAuthToken( token: string ): void {
        this.header = new Headers( {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        this.token = 'Bearer ' + token;
        this.cookieService.set("token",token);

    }

    clearHeader(): void {
        this.header = new Headers( {
            'Content-Type': 'application/json'
        });

        this.token = '';
        this.cookieService.delete("token");
    }


}

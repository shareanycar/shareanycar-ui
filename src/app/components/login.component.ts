import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HeaderService } from '../services/header.service';

@Component( {
    selector: 'app-login',
    templateUrl: './html/login.component.html',
    styleUrls: ['./css/login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    errorMsg: string;

    constructor( private userService: UserService, private router: Router, private headerService: HeaderService ) { }

    ngOnInit() {
    }

    login(): void {
        this.userService.auth( this.email, this.password )
            .then(( token ) => this.success( token.token ) )
            .catch(() => this.errorMsg = "wrong email or password" );
    }

    success( token: string ): void {
        this.headerService.headerAddAuthToken( token );
        this.userService.login();
        this.router.navigate( ['home'] );
    }

}

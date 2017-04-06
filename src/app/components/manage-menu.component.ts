import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'app-manage-menu',
    templateUrl: './manage-menu.component.html',
    styleUrls: ['./css/manage-menu.component.css']
})
export class ManageMenuComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        if ( !this.userService.isLoggedIn() ) {
            this.router.navigate(['login']);
        }
    }

}

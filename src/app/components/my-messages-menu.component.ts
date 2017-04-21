import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component( {
    selector: 'app-my-messages-menu',
    templateUrl: './html/my-messages-menu.component.html',
    styleUrls: ['./css/my-messages-menu.component.css']
})
export class MyMessagesMenuComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        if ( !this.userService.isLoggedIn() ) {
            this.router.navigate( ['login'] );
        } else {
            this.router.navigate( ['manage','messages', 'incoming'] )
        }
    }

}

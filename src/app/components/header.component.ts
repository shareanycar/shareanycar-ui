import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Message } from '../dto/message';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Rx';

@Component( {
    selector: 'app-header',
    templateUrl: './html/header.component.html',
    styleUrls: ['./css/header.component.css']
})
export class HeaderComponent implements OnInit {

    newMessages: Message[];
    hasNewMessages: boolean = false;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private router: Router
    ) { }

    ngOnInit() {
        let timer = Observable.timer(0,60000);
        timer.subscribe(t=> {
            this.checkNewMessages();
        });
    }

    checkNewMessages() {
        if ( this.userService.isLoggedIn() ) {
            this.messageService.newMessages()
                .then(( messages ) => {
                    this.newMessages = messages;
                    if ( this.newMessages.length > 0) {
                        this.hasNewMessages = true;
                    }else{
                        this.hasNewMessages = false;
                    }
                });
        }
    }

    
    logout() {
        this.userService.logout();
        this.router.navigate( ['/'] );
    }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Message } from '../dto/message';


@Component( {
    selector: 'app-read-message',
    templateUrl: './html/read-message.component.html',
    styleUrls: ['./css/read-message.component.css']
})
export class ReadMessageComponent implements OnInit {

    viewMessageId: number;
    viewMessage: Message;
    sendMessage: Message = new Message;

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit() {
        if ( !this.userService.isLoggedIn() ) {
            this.router.navigate( ['login'] );
        }

        this.activatedRoute.params.subscribe(( params ) => this.viewMessageId = params['id'] );
        this.messageService.read( this.viewMessageId )
            .then(( message ) => this.viewMessage = message )
    }

}

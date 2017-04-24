import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Message } from '../dto/message';
import { User } from '../dto/user';


@Component( {
    selector: 'app-read-message',
    templateUrl: './html/read-message.component.html',
    styleUrls: ['./css/read-message.component.css']
})
export class ReadMessageComponent implements OnInit {

    viewMessageId: number;
    viewMessage: Message;
    sendMessage: Message = new Message;
    fromUser: User;
    toUser: User;
    errMsg: string;

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
            .then(( message ) => {
                this.viewMessage = message;
                this.userService.info(this.viewMessage.fromUserId)
                .then((user) => this.fromUser = user);
            });

    }

    reply() {
        this.sendMessage.title = this.viewMessage.title;
        this.sendMessage.toUserId = this.viewMessage.fromUserId;
        this.messageService.send( this.sendMessage )
            .then(() => this.errMsg = "message has been sent" );
    }

}

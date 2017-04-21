import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { User } from '../dto/user';
import { Message } from '../dto/message';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-send-message',
    templateUrl: './html/send-message.component.html',
    styleUrls: ['./css/send-message.component.css']
})
export class SendMessageComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private messageService: MessageService,
        private location: Location,
        private router: Router
    ) { }

    userId: number;
    user: User;
    message: Message = new Message;
    errorMsg: string;


    ngOnInit() {
        if ( this.userService.isLoggedIn() ) {
            this.activatedRoute.params.subscribe(( params: Params ) => this.userId = params['id'] );
            this.userService.info( this.userId ).then(( user ) => this.user = user );
        } else {
            this.router.navigate(['login']);
        }
    }

    send(): any {
        this.message.toUserId = this.user.id;
        this.message.toUserName = this.user.firstName;

        this.messageService.send( this.message )
            .then(() => this.errorMsg = "message has been sent" )
            .catch(() => this.errorMsg = "problem with your message" );
    }

}

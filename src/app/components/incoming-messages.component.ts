import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Message } from '../dto/message';

@Component( {
    selector: 'app-incoming-messages',
    templateUrl: './html/incoming-messages.component.html',
    styleUrls: ['./css/incoming-messages.component.css']
})
export class IncomingMessagesComponent implements OnInit {

    messages: Message[];
    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.messageService.incoming()
            .then(( messages ) => this.messages = messages );
    }

}

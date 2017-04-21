import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../dto/message';

@Component( {
    selector: 'app-outgoing-messages',
    templateUrl: './html/outgoing-messages.component.html',
    styleUrls: ['./css/outgoing-messages.component.css']
})
export class OutgoingMessagesComponent implements OnInit {

    messages: Message[] = [];

    constructor( private messageService: MessageService ) { }

    ngOnInit() {
        this.messageService.outgoing()
            .then(( messages ) => this.messages = messages );
    }

}

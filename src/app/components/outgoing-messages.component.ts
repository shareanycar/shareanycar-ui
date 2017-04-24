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
    marked: boolean[] = [];

    constructor( private messageService: MessageService ) { }

    ngOnInit() {
        this.messageService.outgoing()
            .then(( messages ) => {
                this.messages = messages;
                this.messages.forEach(() => this.marked = this.marked.concat( [false] ) );
            });
    }

    remove(): any {

        let markedMessages: Message[] = this.messageService.markedMessages(this.messages, this.marked);
        this.messages = this.messageService.remainingMessages(this.messages, this.marked);
        this.marked = [];
        this.messages.forEach(() => this.marked = this.marked.concat( [false] ) );
        
        this.messageService.remove(markedMessages);
    }
}

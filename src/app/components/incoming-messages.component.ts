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

    messages: Message[] = [] ;
    marked: boolean[] = [];
    
    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.messageService.incoming()
            .then(( messages ) => {
                this.messages = messages;
                this.messages.forEach(() => this.marked = this.marked.concat( [false] ) );
            });
    }

    getMessageStyle( status: string ): string {
        if ( status == "NEW" ) {
            return "bold";
        } else {
            return "normal";
        }
    }

    remove(): any {
        let markedMessages: Message[] = this.messageService.markedMessages(this.messages, this.marked);

        this.messages = this.messageService.remainingMessages(this.messages, this.marked);
        
        this.marked = [];
        this.messages.forEach(() => this.marked = this.marked.concat( [false] ) );
        
        this.messageService.remove(markedMessages);
    }

}

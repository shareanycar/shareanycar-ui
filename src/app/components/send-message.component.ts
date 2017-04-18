import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../dto/user';

@Component( {
    selector: 'app-send-message',
    templateUrl: './html/send-message.component.html',
    styleUrls: ['./css/send-message.component.css']
})
export class SendMessageComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) { }

    userId: number;
    user: User;
    
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => this.userId = params['id']);
        this.userService.info(this.userId).then((user) => this.user = user);
    }

}

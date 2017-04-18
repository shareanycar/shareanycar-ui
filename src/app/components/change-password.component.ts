import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component( {
    selector: 'app-change-password',
    templateUrl: './html/change-password.component.html',
    styleUrls: ['./css/change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    errorMsg: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
    }

    changePassword(): void {
        if(this.newPassword != this.newPasswordConfirm){
            this.errorMsg = "passwords do not match";
        }else{
            this.userService.changePassword(this.oldPassword, this.newPassword)
            .then(() => this.errorMsg = "password has been updated")
            .catch(() => this.errorMsg = "password has not been updated");
        }
    }

}

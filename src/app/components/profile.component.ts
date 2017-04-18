import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { HeaderService } from '../services/header.service';
import {AppSettings} from '../appSettings';
import { FileUploader } from 'ng2-file-upload';


@Component( {
    selector: 'app-profile',
    templateUrl: './html/profile.component.html',
    styleUrls: ['./css/profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: User;
    uploader: FileUploader;
    errorMsg: string;
    constructor( 
            private userService: UserService,
            private imageService: ImageService,
            private headerService: HeaderService) { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: AppSettings.API_ENDPOINT + "image/user" , authToken: this.headerService.authToken()
        });
        
        this.uploader.onCompleteAll = () =>{
           this.fetchDetails();
        };
        
        this.fetchDetails();
        
    }
    
    fetchDetails(){
        this.userService.detail()
        .then(( user ) => {
            this.user = user;
        });
    }
    
    save(){
        this.userService.update(this.user)
        .then(() => this.errorMsg = "details updated")
        .catch(() => this.errorMsg = "can not update detail");
        
        this.uploader.uploadAll();
    }
    
    deleteImage(){
        this.imageService.deleteUserImage()
        .then(() => this.fetchDetails())
        .catch(() => this.errorMsg = "can not remove image");
    }

}

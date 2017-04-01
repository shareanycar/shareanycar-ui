import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Location } from '@angular/common';
import {Image} from '../../dto/Image';
import {ImageService} from '../../services/image.service';
import {AppSettings} from '../../appSettings';
import {HeaderService} from '../../services/header.service';



@Component( {
    selector: 'app-owner-car-image',
    templateUrl: './owner-car-image.component.html',
    styleUrls: ['./css/owner-car-image.component.css']
})
export class OwnerCarImageComponent implements OnInit {


    uploader: FileUploader;
    images: Image[];
    carId: number;

    constructor(
        private headerService: HeaderService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private ownerService: OwnerService,
        private location: Location,
        private imageService: ImageService
    ) { }

    fetchImages(id){
        this.imageService.images(id)
        .then(images => this.images = images)
        .catch(() => console.log('can not fetch images'));
    }
    
    ngOnInit() {
        if ( !this.ownerService.isLoggedIn() ) {
            this.router.navigate( ['owner'] );
        }
        this.activatedRoute.params.subscribe(
            ( params: Params ) => {
                if ( params['id'] != null ) {
                    this.carId = params['id'];
                    
                    this.uploader = new FileUploader( {
                        url: AppSettings.API_ENDPOINT + "image/car/" + this.carId, authToken: this.headerService.authToken()
                    });
                    
                   this.uploader.onCompleteAll = () => {
                       this.fetchImages(this.carId);  
                   }
                   
                   this.fetchImages(this.carId);                 
                }
            }
        );

    }

    
 
}

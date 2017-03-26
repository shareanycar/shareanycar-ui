import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UrlService } from '../../services/url.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import {Location} from '@angular/common';


@Component( {
    selector: 'app-owner-car-image',
    templateUrl: './owner-car-image.component.html',
    styleUrls: ['./css/owner-car-image.component.css']
})
export class OwnerCarImageComponent implements OnInit {


    private uploader: FileUploader;
    //public hasBaseDropZoneOver: boolean = false;
    //public hasAnotherDropZoneOver: boolean = false;

    constructor(
        private urlService: UrlService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private ownerService: OwnerService,
        private location: Location
    ) { }

    ngOnInit() {
        if ( !this.ownerService.isLoggedIn() ) {
            this.router.navigate( ['owner'] );
        }
        this.activatedRoute.params.subscribe(
            ( params: Params ) => {
                this.uploader = new FileUploader( {
                    url: this.urlService.carImageUpload( params['id'] ), authToken: this.urlService.authToken()
                });
            }

        );

    }

    uploadImage(): any{
        this.uploader.uploadAll();
        this.location.back();
        
    }
/*
    public fileOverBase( e: any ): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother( e: any ): void {
        this.hasAnotherDropZoneOver = e;
    }
*/
}

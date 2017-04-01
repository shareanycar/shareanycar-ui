import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { LocationService } from '../../services/location.service';
import { Owner } from '../../dto/owner';
import { Property } from '../../dto/property';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '../../dto/location';
import {Location as Nav} from '@angular/common';
import 'rxjs/add/operator/toPromise';


@Component( {
    selector: 'app-owner-detail',
    templateUrl: './owner-detail.component.html',
    styleUrls: ['./css/owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

    owner: Owner;
    countries: string[];
    cities: string[];
    oldPassword: string;
    password: string;
    passwordConfirm: string;

    
    errorMsg: string;
    errorMsgPassword: string;

    locations: Location[];


    constructor(
        private ownerService: OwnerService,
        private activatedRoute: ActivatedRoute,
        private locationService: LocationService,
        private router: Router,
        private nav: Nav
    ) { }

    ngOnInit() {
      this.locationService.all()
            .then(( locations ) => {
                this.locations = locations;
                this.countries = this.locationService.countries( this.locations );

                if ( !this.ownerService.isLoggedIn() ) {
                    this.owner = new Owner;
                    
                    this.owner.locationCountry = this.countries[0];
                    this.cities = this.locationService.cities( this.owner.locationCountry, this.locations );
                    
                    this.owner.locationCity = this.cities[0];

                } else {
                    this.ownerService.detail()
                        .then(( owner ) => {
                            this.owner = owner;
                            this.cities = this.locationService.cities( this.owner.locationCountry, this.locations );        
                        });
                }

            }).catch(() => console.log( "can not fetch locations" ) );

    }

    change() {
        this.cities = this.locationService.cities( this.owner.locationCountry, this.locations );
    }

    signup(): void {
        if ( this.password == this.passwordConfirm ) {
            this.owner.password = this.password;
            this.ownerService.create( this.owner ).then( () => this.router.navigate( ['owner'] ) );
        } else {
            this.errorMsg = "passwords do not match";
        }
    }

    update(): void{
        this.ownerService
        .update(this.owner)
        .then(() => this.errorMsg = "settings updated")
        .catch(() => this.errorMsg = "error updating settings");
        
        if(this.password != null || this.passwordConfirm != null || this.oldPassword != null){
            if(this.password != this.passwordConfirm){
                this.errorMsgPassword = "new password does not match confirm new password";
            }else{
                this.ownerService.updatePassword(this.oldPassword, this.password)
                .then(() => this.errorMsgPassword = "password updated")
                .catch(() => this.errorMsgPassword = "password update error" );
            }
        }
    }
    
    

}

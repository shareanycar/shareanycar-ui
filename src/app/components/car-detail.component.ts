import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { CarService } from '../services/car.service';
import { UserService } from '../services/user.service';
import { HeaderService } from '../services/header.service';
import { LocationService } from '../services/location.service';
import { Car } from '../dto/car';
import {Image} from '../dto/image';
import { Location } from '../dto/location';
import { FileUploader } from 'ng2-file-upload';
import { AppSettings } from '../appSettings';



@Component( {
    selector: 'app-car-detail',
    templateUrl: './html/car-detail.component.html',
    styleUrls: ['./css/car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

    carId: number;
    car: Car;
    locations: Location[] ;
    images: Image[];
    insurers: string[] = [];
    manufacturers: string[] = [];
    countries: string[] = [];
    cities: string[] = [];
    transmissionTypes: string[] = [];
    fuelTypes: string[] = [];
    carTypes: string[] = [];
    uploaderMain: FileUploader;
    uploaderAdditional: FileUploader;
    errorMsg: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private carService: CarService,
        private userService: UserService,
        private headerService: HeaderService,
        private imageService: ImageService,
        private locationService: LocationService,
        private router: Router
    ) { }



    ngOnInit() {
        if ( !this.userService.isLoggedIn() ) {
            this.router.navigate( ['login'] );
        }

        this.activatedRoute.params.subscribe(( params ) => this.carId = params['id'] );

        this.uploaderMain = new FileUploader( { url: AppSettings.API_ENDPOINT + "image/car/" + this.carId + "/main", authToken: this.headerService.authToken() });
        this.uploaderAdditional = new FileUploader( { url: AppSettings.API_ENDPOINT + "image/car/" + this.carId, authToken: this.headerService.authToken() });
        this.uploaderAdditional.onCompleteAll = () => {
            this.imageService.carImages(this.carId)
            .then((images) => this.images = images)
        }

        Promise.all( [
            this.locationService.all(),
            this.carService.detail( this.carId ),
            this.carService.transmissionTypes(),
            this.carService.fuelTypes(),
            this.carService.carTypes(),
            this.carService.manufacturers(),
            this.carService.insurers(),
            this.imageService.carImages(this.carId)

        ] )
            .then(( results: any[] ) => {
                this.locations = results[0];
                this.car = results[1];
                results[2].forEach(( elem ) => this.transmissionTypes.push( elem.name ) );
                results[3].forEach(( elem ) => this.fuelTypes.push( elem.name ) );
                results[4].forEach(( elem ) => this.carTypes.push( elem.name ) );
                results[5].forEach(( elem ) => this.manufacturers.push( elem.name ) );
                results[6].forEach(( elem ) => this.insurers.push( elem.name ) );
                this.images = results[7];

                this.countries = this.locationService.countries( this.locations );
                this.cities = this.locationService.cities( this.car.locationCountry, this.locations );

            });

    }

    changeCountry() {
        this.cities = this.locationService.cities( this.car.locationCountry, this.locations );
        this.car.locationCity = this.cities[0];
    }
    
    saveCar(){
        this.carService.update(this.car)
        .then(() => this.uploaderMain.uploadAll())
        .catch(() => "can not save car");
    }
    
    saveImage(){
        this.uploaderAdditional.uploadAll();
    }
    
    removeImage(id: number){
        this.imageService.deleteCarImage(this.carId, id)
        .then(() => this.images = this.images.filter((elem) => elem.id != id));
       
    }
}

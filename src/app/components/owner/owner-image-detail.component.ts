import { Component, OnInit, Input } from '@angular/core';
import {Image} from '../../dto/image';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OwnerService} from '../../services/owner.service';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-owner-image-detail',
  templateUrl: './owner-image-detail.component.html',
  styleUrls: ['./css/owner-image-detail.component.css']
})
export class OwnerImageDetailComponent implements OnInit {

   image: Image;
   errorMsg;
    
  constructor
  ( 
    private ownerService: OwnerService,
    private imageService: ImageService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
   ) { }

  ngOnInit() {
      if ( !this.ownerService.isLoggedIn() ) {
          this.router.navigate( ['owner'] );
      }
      
      this.activatedRoute.params.subscribe(
              (params: Params)=> {
                  this.imageService.carImage(params['carId'], params['imageId'])
                  .then(image => this.image = image)
                  .catch(() => this.errorMsg = "can not fetch image")
                  }
               );
  }

}

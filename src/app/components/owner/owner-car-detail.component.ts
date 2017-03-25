import { Component, OnInit } from '@angular/core';
import {Car} from '../../dto/car';
import {OwnerService} from '../../services/owner.service';
import {CarService} from '../../services/car.service';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }   from '@angular/common';

@Component({
  selector: 'app-owner-car-detail',
  templateUrl: './owner-car-detail.component.html',
  styleUrls: ['./css/owner-car-detail.component.css']
})
export class OwnerCarDetailComponent implements OnInit {
  car: Car;
  errorMsg: string;
  isNew: boolean;

  constructor
  (
          private ownerService:OwnerService, 
          private carService: CarService, 
          private route: ActivatedRoute, 
          private location: Location,
          private router: Router
  ) { }

  ngOnInit() {
      
      if(this.ownerService.isLoggedIn()){
          this.route
          .params
          .subscribe((params: Params) => 
                  { 
                      if(params['id'] != null){
                          this.carService.detail(params['id'])
                          .then( car => {
                              this.car = car;
                              this.isNew = false;
                              })
                          .catch(() => this.errorMsg = "can not fetch car for id:" + params['id'])
                      }else{
                          this.car = new Car;
                          this.isNew = true;
                      }
                      
                   });
         }else{
             this.router.navigate(['owner']);
         }
  }
  
  _create(): void{
      this.carService
      .create(this.car)
      .then(() => this.router.navigate(['owner/cars']))
      .catch(() => this.errorMsg = "problem creating car"); 
  }
  
  _update(): void{
      this.carService
      .update(this.car )
      .then(() => this.errorMsg = "car has been updated")
      .catch(() => this.errorMsg = "problem updating car");
  }
  
  _delete(): void {
      this.carService
      .delete(this.car.id)
      .then(() => this.location.back())
      .catch(() => this.errorMsg = "problem removing car");
      
  }
  
  
  back(): void{
      this.location.back();
  }

}

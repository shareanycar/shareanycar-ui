import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../../services/owner.service';
import {Router} from '@angular/router';
import {CarService} from '../../services/car.service';
import {Car} from '../../dto/car';

@Component({
  selector: 'app-owner-car-list',
  templateUrl: './owner-car-list.component.html',
  styleUrls: ['./css/owner-car-list.component.css']
})
export class OwnerCarListComponent implements OnInit {

  constructor(
          private ownerService: OwnerService, 
          private carService: CarService,
          private router: Router
          ) { }
  
  cars: Car[];
  errorMsg: string;
  ngOnInit() {
      if(!this.ownerService.isLoggedIn()){
          this.router.navigate(['owner/login'])
      }
      
      this.carService.getAll()
      .then(cars => this.cars = cars)
      .catch(() => this.errorMsg = "cannot fetch all cars");
      
  }

}

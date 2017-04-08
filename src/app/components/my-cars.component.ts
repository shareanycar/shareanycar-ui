import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';
import {Car} from '../dto/car';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./css/my-cars.component.css']
})
export class MyCarsComponent implements OnInit {

  constructor(private carService: CarService) { }
  
  cars: Car[];
  
  ngOnInit() {
      this.carService.userCars()
      .then((cars) => this.cars = cars);
  }

}

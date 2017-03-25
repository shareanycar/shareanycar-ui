import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import {OwnerService} from '../../services/owner.service';

@Component({
  moduleId: module.id,
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./css/owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(private ownerService: OwnerService, private router: Router) { 
      
  }

  ngOnInit() {
     if(!this.ownerService.isLoggedIn()){
        this.router.navigate(['owner/login']);
     }else{
         this.router.navigate(['owner/cars']);
     }
  }

}

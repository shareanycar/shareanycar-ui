import { Component } from '@angular/core';
import {OwnerService} from './services/owner.service';
import {OnInit} from '@angular/core'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    
   constructor(private ownerService: OwnerService) {}
   
   logout(): void{
      this.ownerService.logout(); 
   }
   
   ngOnInit() {
     
     
   }
}


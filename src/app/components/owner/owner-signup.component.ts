import { Component, OnInit,Input } from '@angular/core';
import {Location} from '@angular/common';
import {Owner} from '../../dto/owner';
import {OwnerService} from '../../services/owner.service';
import {UrlService} from '../../services/url.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-signup',
  templateUrl: './owner-signup.component.html',
  styleUrls: ['./css/owner-signup.component.css']
})
export class OwnerSignupComponent implements OnInit {

  constructor(private ownerService: OwnerService, private router: Router, private location: Location, private urlService: UrlService ) { }

  owner: Owner;
  
  errorMsg: string;
  ngOnInit() {
      this.owner = new Owner;
  }
  
  signup(): void{ 
      this.ownerService.create(this.owner).then(token =>  this.success());
  }
    
  success(){
      console.log('success?');
      this.router.navigate(['owner']);
  }
  
  back(): void{
      this.location.back();
  }

}

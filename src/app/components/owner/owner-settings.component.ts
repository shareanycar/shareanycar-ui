import { Component, OnInit } from '@angular/core';
import {Owner} from '../../dto/owner';
import {OwnerService} from '../../services/owner.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-owner-settings',
  templateUrl: './owner-settings.component.html',
  styleUrls: ['./css/owner-settings.component.css']
})
export class OwnerSettingsComponent implements OnInit {

  constructor(
          private activatedRoute: ActivatedRoute,
          private router: Router, 
          private ownerService: OwnerService, 
          private location: Location
   ) { }
  
  owner: Owner ;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  errorMsg: string;
  errorMsgPassword: string;
  
  ngOnInit() {
      
      if(!this.ownerService.isLoggedIn()){
          this.router.navigate(['owner/login']);
          
      }
      this.activatedRoute.params.subscribe((params:Params) => {
          this.ownerService.detail()
          .then((owner) => this.success(owner))
          .catch((owner) => console.log(owner));
      });
      
  }
  
  update(): void{
      this.ownerService.update(this.owner)
      .then(() => this.errorMsg = "account settings updated")
      .catch(() => this.errorMsg = "account settings update error");
      
      this.updatePassword();
  }
  
  updatePassword(): void{
      if(this.oldPassword != null || this.newPassword != null || this.confirmNewPassword != null){
          if(this.newPassword != this.confirmNewPassword){
              this.errorMsgPassword = "new password does not match confirm new password";
          }else{
              this.ownerService.updatePassword(this.oldPassword, this.newPassword)
              .then(() => this.errorMsgPassword = "password updated")
              .catch(() => this.errorMsgPassword = "password update error" );
          }
      }
  }
  
  success(owner: Owner){
      this.owner = owner;
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {OwnerService} from '../../services/owner.service';
import {HeaderService} from '../../services/header.service';

@Component({
  moduleId: module.id,
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./css/owner-login.component.css']
})

export class OwnerLoginComponent implements OnInit {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private ownerService: OwnerService, private router: Router,private headerService: HeaderService) { }

  ngOnInit() {}
  
  login(): void{
      this.ownerService.auth(this.email, this.password)
      .then((token) => this.success(token.token))
      .catch(() => this.errorMsg = "wrong email or password");
  }
  
  success(token: string): void{
      this.headerService.headerAddAuthToken(token);
      this.ownerService.login();
      this.router.navigate(['owner']);
  }
  
}

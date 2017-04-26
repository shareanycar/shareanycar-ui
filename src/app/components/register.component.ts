import { Component, OnInit } from '@angular/core';
import {User} from '../dto/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './html/register.component.html',
  styleUrls: ['./css/register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  password: string;
  confirmPassword: string;
  errorMsg: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.user = new User;
  }
  
  register(){
      if(this.password == this.confirmPassword){
          this.user.password = this.password;
          
          this.userService.create(this.user)
          .then(() => this.errorMsg = "account created. check your mail box and activate your account")
          .catch(() => this.errorMsg = "problem creating account");
      }else{
          this.errorMsg = "password do no match";
      }
  }

}

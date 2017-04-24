import { Injectable } from '@angular/core';
import {User} from '../dto/user';
import {Token} from '../dto/token';
import {Headers, Http } from '@angular/http';
import {HeaderService} from './header.service';
import {AppSettings} from '../appSettings';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  loggedIn: boolean = false;

  constructor(private http: Http, private headerService: HeaderService) { }

  create(user: User): Promise<any>{
      return this.http
      .post(AppSettings.API_ENDPOINT + "user", JSON.stringify(user), {headers: this.headerService.headers()})
      
      .toPromise()
      .catch(this.handleError);
  }
  
  update(user: User): Promise<any>{
      return this.http
      .put(AppSettings.API_ENDPOINT + "user", JSON.stringify(user), {headers: this.headerService.headers()})     
      .toPromise()
      .catch(this.handleError);
  }
  
  
  detail(): Promise<User>{
      return this.http
      .get(AppSettings.API_ENDPOINT + "user", {headers: this.headerService.headers()})
      .toPromise()
      .then(res => res.json() )
      .catch(this.handleError);
  } 
  
  info(id: number): Promise<User>{
      return this.http
      .get(AppSettings.API_ENDPOINT + "user/" + id + "/info", {headers: this.headerService.headers()} )
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  
  auth(email: string, password: string): Promise<Token>{
      return this.http
      .post(AppSettings.API_ENDPOINT + "auth/user", JSON.stringify({email: email, password: password}), {headers: this.headerService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  changePassword(oldPassword: string, newPassword: string): Promise<any>{
      return this.http
      .put(AppSettings.API_ENDPOINT + "user/password",JSON.stringify({oldPassword: oldPassword, newPassword: newPassword}), {headers: this.headerService.headers()} )
      .toPromise()
      .catch(this.handleError);
  }
  
  login(): void{ 
      this.loggedIn = true;
  }
  
  logout(): void{
      this.loggedIn = false;
      this.headerService.clearHeader();
  }
  
  isLoggedIn(): boolean{
      return this.loggedIn;
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); 
      return Promise.reject(error.message || error);
  }
}
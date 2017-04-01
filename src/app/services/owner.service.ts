import { Injectable } from '@angular/core';
import {Owner} from '../dto/owner';
import {Token} from '../dto/token';
import {Headers, Http } from '@angular/http';
import {HeaderService} from './header.service';
import {AppSettings} from '../appSettings';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class OwnerService {

  loggedIn: boolean = false;

  constructor( private http: Http, private headerService: HeaderService) {}
  
  create(owner: Owner): Promise<any>{
      return this.http
      .post(AppSettings.API_ENDPOINT + "owner", JSON.stringify(owner), {headers: this.headerService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  update(owner: Owner): Promise<any>{
      return this.http
      .put(AppSettings.API_ENDPOINT + "owner", JSON.stringify(owner), {headers: this.headerService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  detail(): Promise<Owner>{
      return this.http
      .get(AppSettings.API_ENDPOINT + "owner", {headers: this.headerService.headers()})
      .toPromise()
      .then(res => res.json() as Owner)
      .catch(this.handleError);
  } 
  
  auth(email: string, password: string): Promise<Token>{
      return this.http
      .post(AppSettings.API_ENDPOINT + "auth/owner", JSON.stringify({email: email, password: password}), {headers: this.headerService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  updatePassword(oldPassword: string, newPassword: string): Promise<any>{
      return this.http
      .put(AppSettings.API_ENDPOINT + "owner/password",JSON.stringify({oldPassword: oldPassword, newPassword: newPassword}), {headers: this.headerService.headers()} )
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

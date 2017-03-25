import { Injectable } from '@angular/core';
import {Owner} from '../dto/owner';
import {Token} from '../dto/token';
import { Headers, Http } from '@angular/http';
import {UrlService} from './url.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class OwnerService {

  loggedIn: boolean;

  constructor( private http: Http, private urlService: UrlService) { 
  }
  
  create(owner: Owner): Promise<any>{
      return this.http
      .post(this.urlService.ownerCRUD(), JSON.stringify(owner), {headers: this.urlService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  update(owner: Owner): Promise<any>{
      return this.http
      .put(this.urlService.ownerCRUD(), JSON.stringify(owner), {headers: this.urlService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  detail(): Promise<Owner>{
      return this.http
      .get(this.urlService.ownerCRUD(), {headers: this.urlService.headers()})
      .toPromise()
      .then(res => res.json() as Owner)
      .catch(this.handleError);
  } 
  
  auth(email: string, password: string): Promise<Token>{
      return this.http
      .post(this.urlService.ownerAuth(), JSON.stringify({email: email, password: password}), {headers: this.urlService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  updatePassword(oldPassword: string, newPassword: string): Promise<any>{
      return this.http
      .put(this.urlService.ownerPasswordUpdate(),JSON.stringify({oldPassword: oldPassword, newPassword: newPassword}), {headers: this.urlService.headers()} )
      .toPromise()
      .catch(this.handleError);
  }
  
  login(): void{ 
      this.loggedIn = true;
  }
  
  logout(): void{
      this.loggedIn = false;
      this.urlService.clearHeader();
  }
  
  isLoggedIn(): boolean{
      return this.loggedIn;
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
  
}

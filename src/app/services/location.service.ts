import { Injectable } from '@angular/core';
import {HeaderService} from './header.service';
import {AppSettings} from '../appSettings';
import {Property} from '../dto/property';
import {Headers, Http } from '@angular/http';
import {Location} from '../dto/location';

@Injectable()
export class LocationService {

  constructor(private headerService: HeaderService, private http: Http) { }
  
  all(): Promise<Location[]>{
      return this.http
      .get(AppSettings.API_ENDPOINT + "location/all", {headers: this.headerService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  countries(location: Location[]): string[]{
      let arr: string[] = [];
      
      location.forEach((loc) => {
          if(arr.findIndex((country) => country == loc.country)  == -1){
              arr.push(loc.country);
          }
      });
      return arr;
  }
  
  cities(country: string, location: Location[]): string[]{
     let arr: string[] = [];
     location.forEach((loc) => {
         if(loc.country == country){
             if(arr.findIndex((city) => city == loc.city) == -1){
                 arr.push(loc.city)
             }
         }
     });
     return arr;
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); 
      return Promise.reject(error.message || error);
  }
  
}

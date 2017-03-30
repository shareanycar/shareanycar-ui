import { Injectable } from '@angular/core';
import {Car} from '../dto/car';
import { Headers, Http } from '@angular/http';
import {UrlService} from './url.service';
import {Image} from '../dto/image';

@Injectable()
export class CarService {

  constructor(private http: Http, private urlService: UrlService) { 

  }

  create(car: Car): Promise<any>{
      return this.http
      .post(this.urlService.carCreate(), JSON.stringify(car),  {headers: this.urlService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  detail(id: string): Promise<Car> {
      return this.http
      .get(this.urlService.carDetail(id),{headers: this.urlService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
      
  } 
  
  update(car: Car): Promise<any> {
      return this.http
      .put(this.urlService.carUpdate(car.id),JSON.stringify(car),{headers: this.urlService.headers()} )
      .toPromise()
      .catch(this.handleError);
  }
  
  delete(id: number): Promise<any>{
      return this.http
      .delete(this.urlService.carDelete(id), {headers: this.urlService.headers()})
      .toPromise()
      .catch(this.handleError);
  }
  
  getAll(): Promise<Car[]> {
          return this.http
          .get(this.urlService.carAll(), {headers: this.urlService.headers()})
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);         
   }
  
  
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}

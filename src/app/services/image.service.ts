import { Injectable } from '@angular/core';
import {Image} from '../dto/image';
import {UrlService} from './url.service';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ImageService {

  constructor(private http: Http, private urlService: UrlService) { }
  
  carImages(carId: number): Promise<Image[]> {
      return this.http
      .get(this.urlService.carImages(carId), {headers: this.urlService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  carImage(carId: number, imageId: number): Promise<Image>{
      return this.http
      .get(this.urlService.carImage(carId, imageId), {headers: this.urlService.headers()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}

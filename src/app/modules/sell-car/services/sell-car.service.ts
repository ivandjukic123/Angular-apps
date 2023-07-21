import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SellCarService {

  constructor(private httpClient: HttpClient) {
  }

// we are not using interface to describe this
  sellCarData(data: any): Observable<any> {
    // nor this http request, no types of data
    return this.httpClient.post(`${ConfigService.URLS.FORDONSBOLAGET_URL}${ConfigService.ROUTES.sellCar}`, data);
  }
}

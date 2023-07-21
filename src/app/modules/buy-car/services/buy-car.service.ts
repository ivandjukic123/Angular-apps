import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { BuyCarResponse } from '../interfaces/buy-car-response';
import { Car } from '../interfaces/buy-car';

@Injectable({
  providedIn: 'root'
})
export class BuyCarService {
  slug: string = 'abarth-595-2023-nit851';

  constructor(private httpClient: HttpClient) {
  }

  getCar(): Observable<Car> {
    return this.httpClient.get<BuyCarResponse>(`${ConfigService.URLS.FORDONSBOLAGET_URL}${ConfigService.ROUTES.getCarByName}/${this.slug}`)
      .pipe(
        map((value: BuyCarResponse) => {
          return value.data[0];
        }),
        catchError(error => {
          console.log(error);
          return of(error?.error as Car);
        })
      );
  }

}

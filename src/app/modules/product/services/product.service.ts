import { Injectable } from '@angular/core';
import { DummyProduct } from '../interfaces/dummy-product';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { DummyProductResponse } from '../interfaces/dummy-product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  // we can pass already prepared http params to this getProducts method
  getProducts(skip: number = 0): Observable<DummyProductResponse> {
    let obj = {};
    if (skip) {
      obj = { skip: skip };
    }
    const httpParams = new HttpParams({ fromObject: obj });
    return this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}`, { params: httpParams });
  }


  //this is how we should pass params,
  //if we don't pass any to getProductsExample it will create empty ones (default function argument value -> = new HttpParams())
  getProductsExample(httpParams: HttpParams = new HttpParams()): Observable<DummyProductResponse> {
    return this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}`, { params: httpParams });
  }

  getProductsBySearchTerm(params: HttpParams): Observable<DummyProduct[]> {
    return this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}${ConfigService.ROUTES.search}`, { params: params })
      .pipe(
        map((value: DummyProductResponse) => {
          return value.products;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  //You didn't describe what are we getting here, we are getting array of categories and categories are all strings ["smartphones","laptops","fragrances"...]
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}${ConfigService.ROUTES.categories}`)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  getProductByCategory(category: string): Observable<DummyProductResponse> {
    return this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}${ConfigService.ROUTES.category}/${category}`);
  }

}


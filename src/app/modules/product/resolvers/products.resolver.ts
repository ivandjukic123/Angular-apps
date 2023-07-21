import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Params
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { DummyProductResponse } from '../interfaces/dummy-product-response';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<DummyProductResponse> {
   queryParams: Params = { page: 1 };

  constructor(private productService: ProductService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DummyProductResponse> {
    const params = new HttpParams({
      fromObject: {
        page: 1
      }
    });
    return this.productService.getProductsExample(params);
  }
}

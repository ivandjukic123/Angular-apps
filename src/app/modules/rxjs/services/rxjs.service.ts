import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DummyProductResponse } from '../../product/interfaces/dummy-product-response';
import { ConfigService } from '../../../core/services/config.service';
import { ShoppingCartProducts } from '../../shopping-cart/interfaces/shopping-cart-products';
import { DummyProduct } from '../../product/interfaces/dummy-product';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  private _searchedProducts = new Subject<DummyProduct[]>();
  searchedProducts$ = this._searchedProducts.asObservable();
  private _products = new BehaviorSubject<DummyProduct[]>([]);
  products$ = this._products.asObservable();

  constructor(private http: HttpClient) {
  }

  setSearchedProducts(value: DummyProduct[]): void {
    return this._searchedProducts.next(value);
  }

  getProductsBySearchTerm(params?: HttpParams): void {
    this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}${ConfigService.ROUTES.search}`, { params: params })
      .subscribe((response: DummyProductResponse) => {
        // transferring response to the Subject
        this.setSearchedProducts(response.products);
      });
  }

  setProducts(value: DummyProduct[]): void {
    return this._products.next(value);
  }

  getProductsValues(): DummyProduct[] {
    return this._products.getValue();
  }

  getProducts(): void {
     this.http.get<DummyProductResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}`)
      .subscribe((response: DummyProductResponse) => {
       // transferring response to the Subject
       this.setProducts(response.products);
     });
  }

  getDetails(id: number): Observable<ShoppingCartProducts> {
    return this.http.get<ShoppingCartProducts>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}/${id}`);
  }
}

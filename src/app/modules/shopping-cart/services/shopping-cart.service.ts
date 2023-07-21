import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingResponse } from '../interfaces/shopping-response';
import { ConfigService } from '../../../core/services/config.service';
import { ShoppingCartProducts } from '../interfaces/shopping-cart-products';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _products = new BehaviorSubject<ShoppingResponse>({} as ShoppingResponse);
  products$ = this._products.asObservable();
  private _details = new BehaviorSubject<ShoppingCartProducts>({} as ShoppingCartProducts);
  details$ = this._details.asObservable();
  private _cartProducts = new BehaviorSubject<ShoppingCartProducts[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  setCartProducts(product: ShoppingCartProducts[]): void {
    return this._cartProducts.next(product);
  }

  getCartProducts(): ShoppingCartProducts[] {
    return this._cartProducts.getValue();
  }

  setProducts(products: ShoppingResponse): void {
    return this._products.next(products);
  }

  getProducts(params?: HttpParams): void {
     this.httpClient.get<ShoppingResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}`, { params: params })
       .subscribe((response: ShoppingResponse) => {
          this.setProducts(response);
       });
  }

  getSearchedProduct(params: HttpParams): Observable<ShoppingResponse> {
    return this.httpClient.get<ShoppingResponse>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}${ConfigService.ROUTES.search}`, { params: params });
  }

  setDetails(product: ShoppingCartProducts): void {
    return this._details.next(product);
  }

  getDetails(id: number): void {
    this.httpClient.get<ShoppingCartProducts>(`${ConfigService.URLS.DUMMY_URL}${ConfigService.ROUTES.products}/${id}`)
      .subscribe((response: ShoppingCartProducts) => {
        this.setDetails(response);
      });
  }

  sendCheckoutDetails(data: any): Observable<any> {
    return this.httpClient.post(`${ConfigService.URLS.DUMMY_URL}/http/200`, data);
  }
}

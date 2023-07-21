import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartProducts } from '../../interfaces/shopping-cart-products';
import { HttpParams } from '@angular/common/http';
import { ShoppingResponse } from '../../interfaces/shopping-response';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-products',
  templateUrl: './shopping-cart-products.component.html',
  styleUrls: ['./shopping-cart-products.component.scss']
})
export class ShoppingCartProductsComponent implements OnInit, OnDestroy {
  products: ShoppingCartProducts[] = [];
  pagination = {
    page: 1,
    total: 0,
    limit: 0
  };
  records = {
    selectedRecord: 5,
    pageRecords: [5, 10, 20, 30]
  };
  details!: ShoppingCartProducts;
  isLoading: boolean = false;
  formLoader: boolean = false;
  subtotalPrices: number[] = [];
  prices = {
    subtotalPrice: 0,
    deliveryPrice: 12
  };
  checkoutAlert: boolean = false;
  itemSelected: boolean = false;
  showCheckoutForm!: UntypedFormGroup;
  subscriptions: Subscription[] = [];
  params = new HttpParams();
  cartData = this.shoppingCartService.getCartProducts();
  @ViewChild('successAlert', { static: false }) successAlert?: NgbAlert;

  constructor(public shoppingCartService: ShoppingCartService,
              private modalService: NgbModal,
              private formBuilder: UntypedFormBuilder,
              private router: Router) {
  }

  get name(): UntypedFormGroup {
    return this.showCheckoutForm.get('name') as UntypedFormGroup;
  }

  get surname(): UntypedFormGroup {
    return this.showCheckoutForm.get('surname') as UntypedFormGroup;
  }

  get email(): UntypedFormGroup {
    return this.showCheckoutForm.get('email') as UntypedFormGroup;
  }

  get phone(): UntypedFormGroup {
    return this.showCheckoutForm.get('phone') as UntypedFormGroup;
  }

  get owner(): UntypedFormGroup {
    return this.showCheckoutForm.get('owner') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.showCheckoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('[+0-9]+')],
      address: [''],
      owner: ['', Validators.pattern('[a-zA-Z]+')]
    });

    const value = localStorage.getItem('productInCart');
    if (value) {
      this.cartData = JSON.parse(value);
      this.shoppingCartService.setCartProducts(this.cartData);
    }

    this.shoppingCartService.getCartProducts().forEach(item => {
      this.prices.subtotalPrice += item.price * item.quantity;
    });

    this.params = this.params.set('limit', this.records.selectedRecord);
    this.shoppingCartService.getProducts(this.params);
    this.subscriptions.push(
      this.shoppingCartService.products$.subscribe((data: ShoppingResponse) => {
        this.products = data.products;
        this.products?.forEach((product: ShoppingCartProducts) => {
          product.quantity = product.quantity || 1;
        });
        this.pagination = {
          total: data.total,
          limit: data.limit,
          page: this.pagination.page
        };
        this.records.selectedRecord = data.limit;
      })
    );
  }

  onSearchClick(term: string) {
    if (term) {
      this.params = this.params.set('q', term);
    } else {
      this.params = this.params.set('limit', this.records.selectedRecord);
    }

    if (term) {
      this.shoppingCartService.getSearchedProduct(this.params)
        .subscribe((value: ShoppingResponse) => {
          this.products = value.products;
        });
    } else {
      this.shoppingCartService.getProducts(this.params);
      this.subscriptions.push(
        this.shoppingCartService.products$
          .subscribe((value: ShoppingResponse) => {
            this.products = value.products;
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPageSelect(value: number) {
    const skip = (value - 1) * this.pagination.limit;
    this.params = this.params.set('skip', skip);
    this.params = this.params.set('limit', this.pagination.limit);
    this.params = this.params.set('page', this.pagination.page);

    this.shoppingCartService.getProducts(this.params);
    this.subscriptions.push(
      this.shoppingCartService.products$
        .subscribe((value: ShoppingResponse) => {
          this.products = value.products.map((product: ShoppingCartProducts) => ({
            ...product,
            quantity: product.quantity || 1
          }));
        })
    );
  }

  onSelectedRecord(): void {
    this.params = this.params.set('limit', this.records.selectedRecord);
    this.shoppingCartService.getProducts(this.params);
    this.subscriptions.push(
      this.shoppingCartService.products$
        .subscribe((value: ShoppingResponse) => {
          this.products = value.products.map((product: ShoppingCartProducts) => ({
            ...product,
            quantity: product.quantity || 1
          }));
          this.pagination.limit = value.limit;
          this.pagination.page = 1;
        })
    );
  }

  openDetailModal(id: number, modal: any): void {
    this.modalService.open(modal, { centered: true });
    this.isLoading = true;
    this.shoppingCartService.getDetails(id);
    this.subscriptions.push(
      this.shoppingCartService.details$.subscribe((value: ShoppingCartProducts) => {
        this.details = value;
        this.isLoading = false;
      })
    );
  }

  onCartClick(product: ShoppingCartProducts): void {
    const date = new Date();
    const time = date.getTime();

    product = {
      ...product,
      localId: time
    };

    const existingProduct = this.shoppingCartService.getCartProducts().find(item => {
      return item.id === product.id;
    });
    if (existingProduct) {
      existingProduct.quantity += 1;
      this.prices.subtotalPrice += existingProduct.price;
    } else {
      this.shoppingCartService.getCartProducts().push(product);
    }
    this.itemSelected = true;
    localStorage.setItem('productInCart', JSON.stringify(this.shoppingCartService.getCartProducts()));
    console.log(this.shoppingCartService.getCartProducts());
  }

  openCartModal(modal: any): void {
    this.router.navigate(['/shopping-cart/cart']);
    this.modalService.open(modal, { size: 'lg', centered: true });
    if (this.itemSelected) {
      this.prices.subtotalPrice = 0;
      this.shoppingCartService.getCartProducts().forEach(item => {
        this.prices.subtotalPrice += item.price * item.quantity;
      });
    }
    console.log('subtotal price', this.prices.subtotalPrice);
  }

  onDelete(product: ShoppingCartProducts): void {
    const productIndex = this.shoppingCartService.getCartProducts().findIndex(item => {
      return item.localId === product.localId;
    });
    this.shoppingCartService.getCartProducts().splice(productIndex, 1);

    this.prices.subtotalPrice = this.prices.subtotalPrice - (product.price * product.quantity);
    localStorage.setItem('productInCart', JSON.stringify(this.shoppingCartService.getCartProducts()));
  }

  onCartModalClose(modal: any) {
    this.router.navigate(['/shopping-cart']);
    this.modalService.dismissAll(modal);
    this.itemSelected = false;
  }

  onQuantityChange(): void {
    this.subtotalPrices = [];
    this.shoppingCartService.getCartProducts().forEach(item => {
      const price = item.price * item.quantity;
      this.subtotalPrices.push(price);
    });
    this.prices.subtotalPrice = this.subtotalPrices.reduce((acc, val) => {
      if (val) {
        return acc + val;
      } else {
        return acc;
      }
    }, 0);
  }

  onCheckoutButton(modal: any): void {
    this.router.navigate(['/shopping-cart/checkout']);
    this.modalService.open(modal, { size: 'xl', centered: true });
  }

  onCheckoutSubmit(): void {
    this.showCheckoutForm.markAllAsTouched();
    console.log(this.showCheckoutForm.value);

    if (this.showCheckoutForm.valid) {
      this.formLoader = true;
      this.shoppingCartService.sendCheckoutDetails(this.showCheckoutForm.value)
        .subscribe(value => {
          console.log('forms value', value);
          this.formLoader = false;
          this.showCheckoutForm.reset();
          this.checkoutAlert = true;
          this.successAlert?.close();
        });
    }
  }

  onCheckoutClose(modal: any): void {
    if (this.checkoutAlert) {
      this.router.navigate(['/shopping-cart']);
      this.modalService.dismissAll(modal);
      this.checkoutAlert = false;
      this.shoppingCartService.getCartProducts().splice(0, this.shoppingCartService.getCartProducts().length);
      this.subtotalPrices = [];
      this.prices.subtotalPrice = 0;
      localStorage.removeItem('productInCart');
    } else {
      this.router.navigate(['/shopping-cart/cart']);
      modal.close();
    }
  }

  onDetailModalClose() {
    this.router.navigate(['/shopping-cart']);
    this.modalService.dismissAll();
  }
}

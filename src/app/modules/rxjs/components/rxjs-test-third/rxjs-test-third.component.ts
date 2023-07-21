import { Component, OnDestroy, OnInit } from '@angular/core';
import { DummyProduct } from '../../../product/interfaces/dummy-product';
import { RxjsService } from '../../services/rxjs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs-test-third',
  templateUrl: './rxjs-test-third.component.html',
  styleUrls: ['./rxjs-test-third.component.scss']
})
export class RxjsTestThirdComponent implements OnInit, OnDestroy {
  products: DummyProduct[] = [];
  subscription!: Subscription;
  newProduct: DummyProduct = {
    id: 5526,
    title: 'Graficka',
    price: 552,
    discountPercentage: 10,
    rating: 5,
    stock: 2,
    brand: 'Nvidia',
    category: 'Computer parts',
    thumbnail: 'https://www.nvidia.com/en-eu/geforce/graphics-cards/jcr%3acontent/root/responsivegrid/nv_container_1965276325/nv_teaser.coreimg.90.850.jpeg/1662976765003.jpeg',
    images: []
  };

  constructor(private rxjsService: RxjsService) {
  }

  ngOnInit(): void {
    this.subscription = this.rxjsService.products$
      .subscribe((value: DummyProduct[]) => {
        this.products = value;
        console.log('products', this.products);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onUpdateButtonClick() {
    this.rxjsService.getProductsValues().push(this.newProduct);
    console.log('products', this.rxjsService.getProductsValues());
  }
}

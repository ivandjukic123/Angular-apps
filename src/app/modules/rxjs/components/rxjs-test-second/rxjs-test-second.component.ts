import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../../services/rxjs.service';
import { DummyProduct } from '../../../product/interfaces/dummy-product';

@Component({
  selector: 'app-rxjs-test-second',
  templateUrl: './rxjs-test-second.component.html',
  styleUrls: ['./rxjs-test-second.component.scss']
})
export class RxjsTestSecondComponent implements OnInit {
  products: DummyProduct[] = [];

  constructor(private rxjsService: RxjsService) {
  }

  ngOnInit(): void {
    this.products = this.rxjsService.getProductsValues()
  }

}

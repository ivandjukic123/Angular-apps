import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { DummyProduct } from '../../interfaces/dummy-product';
import { debounceTime, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DummyProductResponse } from '../../interfaces/dummy-product-response';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-root',
  templateUrl: './product-root.component.html',
  styleUrls: ['./product-root.component.scss']
})
export class ProductRootComponent implements OnInit {
  products: DummyProduct[] = [];
  searchTerm: string = '';
  // ng select thinks '' is value, null is empty model (X issue)
  category: string | null = null;
  // categories are of type string[] not DummyProduct[]
  categories: string[] = [];
  images: string[] = [];
  // we could make object, no need for many single variables like above
  pagination = {
    page: 1,
    total: 0,
    limit: 0
  };
  pageRecordsArr = [5, 10, 20, 30];
  selectedRecord: number = 0;
  private searchTerm$: Subject<string> = new Subject<string>();

  constructor(public productService: ProductService,
              private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.searchTerm$
      .pipe(debounceTime(500))
      .subscribe(searchTerm => {
        if (searchTerm) {
          this.getProductsBySearchTerm(searchTerm);
        } else {
          this.getAllProducts();
        }
      });

    // load products and categories with resolver
    this.activatedRoute.data.subscribe(data => {
      this.products = data['products'].products;
      this.pagination = {
        total: data['products'].total,
        limit: data['products'].limit,
        page: 1
      };
      console.log(this.pagination);
      this.categories = data['categories'];
      // default record for ng select
      this.selectedRecord = data['products'].limit;
    });
  }

  onRecordSelect() {
    const params = new HttpParams({
      fromObject: {
        limit: this.selectedRecord
      }
    });

    this.productService.getProductsExample(params)
      .subscribe((products: DummyProductResponse) => {
        this.products = products.products;
        this.pagination.limit = products.limit;
        this.pagination.page = 1;
      });
  }

  onPageSelect(value: number) {
    const skip = (value - 1) * this.pagination.limit;
    this.productService.getProducts(skip)
      .subscribe((products: DummyProductResponse) => {
        this.products = products.products;
      });
  }

  onPageSelect1(value: number): void {
    const skip = (value - 1) * this.pagination.limit;
    const params = new HttpParams({
      fromObject: {
        skip: skip,
        limit: this.pagination.limit,
        page: this.pagination.page
      }
    });
    this.productService.getProductsExample(params)
      .subscribe((products: DummyProductResponse) => {
        this.products = products.products;
      });
  }

  onPageSelectExample(value: number): void {
    const skip = (value - 1) * this.pagination.limit;
    let params = new HttpParams()
      .set('test_prop', 5)
      .set('prop_3', 'yolo');
    params = params.append('skip', skip);
    params = params.append('some_prop', 1);
    params = params.append('another', true);

    const params1 = new HttpParams({
      fromObject: {
        skip: skip,
        prop1: 1,
        prop2: true,
        prop3: [1, 2, 3],
        prop4: [1, 2, 3].join(',')
      }
    });
    // we can pass params or params1, same thing different way of writing, but method should accept http params, that way much easier
    // now we're passing params || params1
    // this.productService.getProductsExample(params)
    this.productService.getProductsExample(params1)
      .subscribe((products: DummyProductResponse) => {
        this.products = products.products;
      });
  }

  onCategoryChange() {
    //we check if we have category before we make getProductByCategory call
    // when we clear our model we get logical error bcs category will be null
    if (this.category) {
      this.productService.getProductByCategory(this.category)
        .subscribe((response: DummyProductResponse) => {
          this.products = response.products;
          // we don't need to set limit here, only total, records per page should be changed only when user selects it
          this.pagination.total = response.total;
        });
    } else {
      // if we have no category get regular products
      this.getAllProducts();
    }
  }

  getAllProducts(): void {
    this.productService.getProducts()
      .subscribe((products: DummyProductResponse) => {
        this.pagination = {
          total: products.total,
          limit: products.limit,
          page: 1
        };
        this.products = products.products;
      });
  }

  getProductsBySearchTerm(searchTerm: string): void {
    const params = new HttpParams().set('q', searchTerm);
    this.productService.getProductsBySearchTerm(params)
      .subscribe((products: DummyProduct[]) => {
        this.products = products;
      });
  }

  onSearchTermModelChange(model: string): void {
    this.searchTerm = model;
    // this is how we send data to subject
    this.searchTerm$.next(model);
  }

  openImageCarousel(images: string[], modal: any): void {
    this.images = images;
    this.modalService.open(modal, { centered: true });
  }
}

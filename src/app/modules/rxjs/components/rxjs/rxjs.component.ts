import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import { RxjsService } from '../../services/rxjs.service';
import { HttpParams } from '@angular/common/http';
import { DummyProduct } from '../../../product/interfaces/dummy-product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartProducts } from '../../../shopping-cart/interfaces/shopping-cart-products';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  products: DummyProduct[] = [];
  subscriptions: Subscription[] = [];
  details$!: Observable<ShoppingCartProducts>;
  dummyProducts$!: Observable<DummyProduct[]>;
  displayText: boolean = false;
  private replaySubject$ = new ReplaySubject<number>(3);
  private subjectVoid$ = new Subject<void>();
  private searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentProduct$ = new BehaviorSubject<DummyProduct>({} as DummyProduct);

  constructor(private rxjsService: RxjsService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    // assigning the value to the dummyProducts$ observable
    // which is used in the template with async pipe
    this.dummyProducts$ = this.rxjsService.products$;

    // when we get data, debounceTime operator will wait for 500 milliseconds before
    // emitting the latest value from the searchTerm$, and distinctUntilChanged operator
    // will emit only if the value is different from the previous one

    this.subscriptions.push(
      this.searchTerm$
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe(searchTerm => {
          // calling the getProductsBySearchTerm method
          this.getProductsBySearchTerm(searchTerm);
        })
    );

    // subject void is triggered when the button is clicked
    // and text is displayed
    this.subscriptions.push(
      this.subjectVoid$.subscribe(() => {
        this.displayText = true;
      })
    );
  }

  onSearchClick(event: any) {
    this.searchTerm = event;
    // emitting the value to the searchTerm$ BehaviorSubject
    this.searchTerm$.next(this.searchTerm);

    // subscribing to the replaySubject$ and logging the id value
    this.subscriptions.push(
      this.replaySubject$.subscribe((value: number) => {
        console.log(value);
      })
    );
  }

  getProductsBySearchTerm(searchTerm: string): void {
    this.displayText = false;
    const params = new HttpParams().set('q', searchTerm);
    this.rxjsService.getProductsBySearchTerm(params);
    // subscribing to the product$ observable and assigning the value to the products array
    this.subscriptions.push(
      this.rxjsService.searchedProducts$.subscribe((products: DummyProduct[]) => {
        this.products = products;
      })
    );
  }

  onDetailClick(modal: any, id: number) {
    this.displayText = false;
    this.modalService.open(modal, { centered: true });

    // calling the getDetails method from the rxjsService and
    // assigning the value to the details$ observable which is used in the template with async pipe
    this.details$ = this.rxjsService.getDetails(id);

    // emitting the value to the replaySubject$
    this.replaySubject$.next(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onFetchClick() {
    this.rxjsService.getProducts();

    // emitting the value to the subjectVoid$
    this.subjectVoid$.next();
  }

  currentProduct(product: DummyProduct) {
    this.currentProduct$.next(product);
  }

}

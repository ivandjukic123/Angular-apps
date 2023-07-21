import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductRootComponent } from './components/product-root/product-root.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SuffixPipe } from './pipes/sufix.pipe';
import { NgbCarouselModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductRootComponent,
    SuffixPipe
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbCarouselModule,
    NgbPaginationModule
  ]
})
export class ProductModule { }

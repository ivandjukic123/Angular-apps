import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRootComponent } from './components/shopping-cart-root/shopping-cart-root.component';
import { ShoppingCartProductsComponent } from './components/shopping-cart-products/shopping-cart-products.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ShoppingCartRootComponent,
    ShoppingCartProductsComponent
  ],
    imports: [
        CommonModule,
        ShoppingCartRoutingModule,
        FormsModule,
        NgbPaginationModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgbAlertModule
    ]
})
export class ShoppingCartModule {}

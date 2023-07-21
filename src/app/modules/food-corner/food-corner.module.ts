import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodCornerRoutingModule } from './food-corner-routing.module';
import { FoodCornerCartComponent } from './components/food-corner-cart/food-corner-cart.component';
import { FoodCornerMainComponent } from './components/food-corner-main/food-corner-main.component';
import { FoodCornerDetailComponent } from './components/food-corner-detail/food-corner-detail.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FoodCornerMainComponent,
    FoodCornerCartComponent,
    FoodCornerDetailComponent
  ],
  imports: [
    CommonModule,
    FoodCornerRoutingModule,
    NgbAlertModule,
    FormsModule
  ]
})
export class FoodCornerModule {}

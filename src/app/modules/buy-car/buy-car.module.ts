import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyCarRoutingModule } from './buy-car-routing.module';
import { BuyCarRootComponent } from './components/buy-car-root/buy-car-root.component';
import { BuyCarComponent } from './components/buy-car/buy-car.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BuyCarRootComponent,
    BuyCarComponent
  ],
    imports: [
        CommonModule,
        BuyCarRoutingModule,
        NgbNavModule
    ]
})
export class BuyCarModule {}

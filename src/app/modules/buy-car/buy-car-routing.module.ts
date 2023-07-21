import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyCarRootComponent } from './components/buy-car-root/buy-car-root.component';

const routes: Routes = [
  {
    path: '',
    component: BuyCarRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyCarRoutingModule {
}

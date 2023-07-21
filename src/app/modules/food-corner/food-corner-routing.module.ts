import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodCornerCartComponent } from './components/food-corner-cart/food-corner-cart.component';
import { FoodCornerMainComponent } from './components/food-corner-main/food-corner-main.component';
import { FoodCornerDetailComponent } from './components/food-corner-detail/food-corner-detail.component';


const routes: Routes = [
  {
    path: '',
    component: FoodCornerMainComponent
  },
  {
    path: 'cart',
    component: FoodCornerCartComponent
  },
  {
    path: 'detail/:id',
    component: FoodCornerDetailComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCornerRoutingModule {
}

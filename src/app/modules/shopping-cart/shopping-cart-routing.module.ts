import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartRootComponent } from './components/shopping-cart-root/shopping-cart-root.component';


const routes: Routes = [
  {
    path: '',
    component: ShoppingCartRootComponent
  },
  {
    path: 'cart',
    component: ShoppingCartRootComponent
  },
  {
    path: 'checkout',
    component: ShoppingCartRootComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }

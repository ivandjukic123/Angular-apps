import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/components/core/core.component';
import { NoopComponent } from './core/components/noop/noop.component';

const routes: Routes = [
  {
    path: '',
    component: NoopComponent
  },
  {
    path: 'core',
    component: CoreComponent
  },
  {
    path: 'todo',
    loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./modules/reactive-form/form.module').then(m => m.FormModule)
  },
  {
    path: 'sell-car',
    loadChildren: () => import('./modules/sell-car/sell-car.module').then(m => m.SellCarModule)
  },
  {
    path: 'buy-car',
    loadChildren: () => import('./modules/buy-car/buy-car.module').then(m => m.BuyCarModule)
  },
  {
    path: 'ui-form',
    loadChildren: () => import('./modules/ui-form/ui-form.module').then(m => m.UiFormModule)
  },
  {
    path: 'accordion',
    loadChildren: () => import('./modules/accordion/accordion.module').then(m => m.AccordionModule)
  },
  {
    path: 'stepper-form',
    loadChildren: () => import('./modules/stepper-form/stepper-form.module').then(m => m.StepperFormModule)
  },
  {
    path: 'todo-old',
    loadChildren: () => import('./modules/todo-old/todo-old.module').then(m => m.TodoOldModule)
  },
  {
    path: 'dummy',
    loadChildren: () => import('./modules/dummy/dummy.module').then(m => m.DummyModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'food-corner',
    loadChildren: () => import('./modules/food-corner/food-corner.module').then(m => m.FoodCornerModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('./modules/rxjs/rxjs.module').then(m => m.RxjsModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./modules/weather/weather.module').then(m => m.WeatherModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

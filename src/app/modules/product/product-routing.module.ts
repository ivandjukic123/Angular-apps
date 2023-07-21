import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRootComponent } from './components/product-root/product-root.component';
import { ProductsResolver } from './resolvers/products.resolver';
import { CategoriesResolver } from './resolvers/categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductRootComponent,
    resolve: {
      products: ProductsResolver,
      categories: CategoriesResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}

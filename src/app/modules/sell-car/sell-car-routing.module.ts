import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellCarRootComponent } from './components/sell-car-root/sell-car-root.component';

const routes: Routes = [
  {
    path: '',
    component: SellCarRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellCarRoutingModule { }

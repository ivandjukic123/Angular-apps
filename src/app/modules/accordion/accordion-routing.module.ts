import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccordionRootComponent} from './components/accordion-root/accordion-root.component';

const routes: Routes = [
  {
    path: '',
    component: AccordionRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccordionRoutingModule {
}

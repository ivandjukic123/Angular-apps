import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionRoutingModule } from './accordion-routing.module';
import { AccordionRootComponent } from './components/accordion-root/accordion-root.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AccordionRootComponent
  ],
  imports: [
    CommonModule,
    AccordionRoutingModule,
    NgbAccordionModule
  ]
})
export class AccordionModule {}

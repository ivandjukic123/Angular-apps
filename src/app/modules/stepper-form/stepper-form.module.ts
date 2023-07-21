import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperFormRoutingModule } from './stepper-form-routing.module';
import { StepperFormRootComponent } from './components/stepper-form-root/stepper-form-root.component';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    StepperFormRootComponent
  ],
  imports: [
    CommonModule,
    StepperFormRoutingModule,
    FormsModule,
    NgbCollapseModule,
    NgSelectModule
  ]
})
export class StepperFormModule { }

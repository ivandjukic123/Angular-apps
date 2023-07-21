import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperFormRootComponent } from './components/stepper-form-root/stepper-form-root.component';

const routes: Routes = [
  {
    path: '',
    component: StepperFormRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepperFormRoutingModule { }

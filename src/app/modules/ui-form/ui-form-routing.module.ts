import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRootComponent } from './components/form-root/form-root.component';

const routes: Routes = [
  {
    path: '',
    component: FormRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiFormRoutingModule {
}

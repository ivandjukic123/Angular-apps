import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFormRoutingModule } from './ui-form-routing.module';
import { FormRootComponent } from './components/form-root/form-root.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormRootComponent
  ],
  imports: [
    CommonModule,
    UiFormRoutingModule,
    FormsModule
  ]
})
export class UiFormModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './components/core/core.component';
import { NoopComponent } from './components/noop/noop.component';



@NgModule({
  declarations: [
    CoreComponent,
    NoopComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

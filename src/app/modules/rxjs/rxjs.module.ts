import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { RxjsRoutingModule } from './rxjs-routing.module';
import { FormsModule } from '@angular/forms';
import { RxjsTestSecondComponent } from './components/rxjs-test-second/rxjs-test-second.component';
import { RxjsTestThirdComponent } from './components/rxjs-test-third/rxjs-test-third.component';



@NgModule({
  declarations: [
    RxjsComponent,
    RxjsTestSecondComponent,
    RxjsTestThirdComponent
  ],
  imports: [
    CommonModule,
    RxjsRoutingModule,
    FormsModule
  ]
})
export class RxjsModule { }

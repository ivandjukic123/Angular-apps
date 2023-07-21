import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellCarRoutingModule } from './sell-car-routing.module';
import { SellCarTemplateComponent } from './components/sell-car-template/sell-car-template.component';
import { SellCarReactiveComponent } from './components/sell-car-reactive/sell-car-reactive.component';
import { SellCarRootComponent } from './components/sell-car-root/sell-car-root.component';



@NgModule({
  declarations: [
    SellCarTemplateComponent,
    SellCarReactiveComponent,
    SellCarRootComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SellCarRoutingModule
  ]
})
export class SellCarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRootComponent } from './components/weather-root/weather-root.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { NgbCarouselModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    WeatherRootComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    NgbTooltipModule,
    NgbCarouselModule
  ]
})
export class WeatherModule { }

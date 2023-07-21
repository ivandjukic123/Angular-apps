import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherRootComponent } from './components/weather-root/weather-root.component';


const routes: Routes = [
  {
    path: '',
    component: WeatherRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../interfaces/weather-response';
import { CityImageResponse } from '../../interfaces/city-image-response';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  weather?: WeatherResponse;
  backgroundImage: string = '';
  forecastHours: any[] = [];
  localTime: string = '';

  constructor(public weatherService: WeatherService,
              private changeDetectionRef: ChangeDetectorRef,
              private config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.weatherService.getWeather('London');
    this.weatherService.weather$.subscribe((response: WeatherResponse) => {
      this.weather = response;
      let weatherTime = new Date(response.location?.localtime).getTime();
      if (response.location?.localtime && weatherTime) {
        this.localTime = response.location?.localtime;
        this.weather.location.localtime = this.formatDate(new Date(this.localTime));
      }

      // setting the forecast hours so that the next hour is the first one
      this.forecastHours = response.forecast?.forecastday[0]?.hour;
      this.forecastHours?.forEach((forecast: any) => {
        let forecastTime = new Date(forecast.time).getTime();
        if (forecastTime) {
          forecast.hour = new Date(forecast.time).getHours();
          forecast.time = this.formatDate(new Date(forecast.time));
        }
      });
      let currentTime = new Date(this.localTime).getHours();
      this.forecastFromCurrentTime(currentTime);
      this.changeDetectionRef.detectChanges();
    });

    this.weatherService.getCityImage('London');
    this.weatherService.cityImage$
      .subscribe((response: CityImageResponse) => {
        response.photos?.forEach((photo: any) => {
          this.backgroundImage = photo.image.mobile;
          this.changeDetectionRef.detectChanges();
        });
      });
  }

  onSearchClick(location: string, tooltip?: any): void {
    if (!location) {
      tooltip.open();
    } else {
      this.weatherService.getWeather(location);
      this.weatherService.getCityImage(location);
      tooltip?.close();
    }
    (document.querySelector('.cm-search-bar') as HTMLInputElement).value = '';
  }

  formatDate(date: Date) {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  forecastFromCurrentTime(currentTime: number) {
    let nextHour = this.forecastHours?.find(forecast => forecast.hour > currentTime);
    let nextHourIndex = this.forecastHours?.indexOf(nextHour);
    let slicedArray = this.forecastHours?.slice(nextHourIndex);
    this.forecastHours = slicedArray?.concat(this.forecastHours?.slice(0, nextHourIndex));
  }
}

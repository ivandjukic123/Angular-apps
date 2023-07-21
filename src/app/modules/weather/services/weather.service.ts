import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config.service';
import { WeatherResponse } from '../interfaces/weather-response';
import { CityImageResponse } from '../interfaces/city-image-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _weather = new BehaviorSubject<WeatherResponse>({} as WeatherResponse);
  weather$ = this._weather.asObservable();
  private _cityImage = new BehaviorSubject<CityImageResponse>({} as CityImageResponse);
  cityImage$ = this._cityImage.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  setWeather(value: WeatherResponse): void {
    return this._weather.next(value);
  }

  getWeather(location: string): void {
    this.httpClient.get<WeatherResponse>(`${ConfigService.URLS.WEATHER_URL}?${ConfigService.KEYS.Weather}&q=${location}`)
      .pipe(
        catchError(error => {
          console.error('No response for this city', error);
          return of({} as WeatherResponse);
        })
      )
      .subscribe((response: WeatherResponse) => {
        this.setWeather(response);
      });
  }

  setCityImage(value: CityImageResponse): void {
    return this._cityImage.next(value);
  }

  getCityImage(city: string): void {
    city = city.toLowerCase().replace(/ /g, '-');
    this.httpClient.get<CityImageResponse>(`${ConfigService.URLS.CITY_IMAGE_URL}/slug:${city}/images/`)
      .pipe(catchError(error => {
        console.error('No image response for this city', error);
        return of({ photos: [{ image: { mobile: 'https://images.unsplash.com/photo-1672746509961-6340a9808970?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' } }] } as CityImageResponse);
      }))
      .subscribe((response: CityImageResponse) => {
        this.setCityImage(response);
      });
  }

}

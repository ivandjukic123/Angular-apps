import { Current, Forecast, Weather } from './weather';

export interface WeatherResponse {
  location: Weather;
  current: Current;
  forecast: Forecast;
}

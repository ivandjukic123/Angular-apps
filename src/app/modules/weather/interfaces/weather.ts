export interface Weather {
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  tz_id: string,
  localtime_epoch: number,
  localtime: string
}

export interface Current {
  last_updated_epoch: number,
  last_updated: string,
  temp_c: number,
  temp_f: number,
  is_day: number,
  wind_mph: number,
  wind_kph: number,
  wind_degree: number,
  wind_dir: string,
  pressure_mb: number,
  pressure_in: number,
  precip_mm: number,
  precip_in: number,
  feelslike_c: number,
  humidity: number,
  cloud: number,
  condition: Condition
}

export interface Condition {
  text: string,
  icon: string,
  code: number
}

export interface Forecast {
  forecastday: Forecastday[];
}

export interface Forecastday {
  date: string,
  hour: Hour[];
}

export interface Hour {
  time: string,
  temp_c: number,
  condition: Condition,
  wind_kph: number,
}

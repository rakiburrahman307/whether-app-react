export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Rain {
  "1h": number;
}

export interface Clouds {
  all: number;
}

export interface System {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: Main;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    dt_txt: string;
    rain?: Rain;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}
export interface GeoCodingResponse{
    name: string,
    local_name: Record<string, string>;
    lat: number;
    lon: number;
    country?: string;
    state?: string;
}
import { useQuery } from "@tanstack/react-query";
import { Coordinates } from "../api/types";
import { weatherApi } from "../api/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  query: (query: string) => ["location-search", query] as const,
} as const;

export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherApi.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
};

export const useReverseGeoCodeQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.reverseGeoCode(coordinates) : null,
    enabled: !!coordinates,
  });
};
export const useSearchLocationQuery = (query: string) => {
  return useQuery({
    queryKey: WEATHER_KEYS.query(query),
    queryFn: () => weatherApi.searchLocation(query),
    enabled: query.length > 2,
  });
};

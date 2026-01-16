import { useState, useEffect, useCallback } from 'react';
import { ICurrentWeather } from '../models';
import * as WeatherService from '../services/WeatherService';

export interface ILocation {
  city: string;
  lat: number;
  lon: number;
}

export interface IWeatherState {
  location: ILocation;
  weatherData: ICurrentWeather | undefined;
  weatherIconURL: string;
  loading: boolean;
  error: string | null;
}

export interface IWeatherActions {
  updateLocation: (newLocation: ILocation) => void;
  refreshWeather: () => void;
}

export type UseWeatherDataReturn = IWeatherState & IWeatherActions;

export const useWeatherData = (initialLocation: ILocation, lang: string = 'fr'): UseWeatherDataReturn => {
  const [location, setLocation] = useState<ILocation>(initialLocation);
  const [weatherData, setWeatherData] = useState<ICurrentWeather | undefined>(undefined);
  const [weatherIconURL, setWeatherIconURL] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (loc: ILocation) => {
    setLoading(true);
    setError(null);

    try {
      const data = await WeatherService.fetchWeather(loc.lat, loc.lon, lang);
      setWeatherData(data);
      const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      setWeatherIconURL(iconURL);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(undefined);
      setWeatherIconURL('');
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchWeatherData(location);
  }, [location, fetchWeatherData]);

  const updateLocation = useCallback((newLocation: ILocation) => {
    setLocation(newLocation);
  }, []);

  const refreshWeather = useCallback(() => {
    fetchWeatherData(location);
  }, [location, fetchWeatherData]);

  return {
    // State
    location,
    weatherData,
    weatherIconURL,
    loading,
    error,
    
    // Actions
    updateLocation,
    refreshWeather,
  };
};

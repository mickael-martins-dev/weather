import { TranslationKeys } from './fr';

export const en: TranslationKeys = {
  app: {
    title: "Weather Station",
    subtitle: "Discover weather around the world"
  },
  search: {
    placeholder: "Paris, London, Tokyo...",
    label: "Search for a city",
    noOptions: "Type at least 2 characters to search...",
    loading: "Searching cities..."
  },
  weather: {
    loading: "Loading weather data...",
    feelsLike: "Feels like",
    minMax: "MIN / MAX",
    humidity: "HUMIDITY",
    wind: "WIND",
    pressure: "PRESSURE"
  },
  units: {
    celsius: "°C",
    speed: "m/s",
    pressure: "hPa"
  },
  errors: {
    apiKey: "Missing API Key. Please check your .env file",
    fetchWeather: "Error fetching weather data",
    fetchLocation: "Error searching for location"
  }
};

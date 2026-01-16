import { TranslationKeys } from './fr';

export const es: TranslationKeys = {
  app: {
    title: "Estación Meteorológica",
    subtitle: "Descubre el clima en todo el mundo"
  },
  search: {
    placeholder: "París, Londres, Tokio...",
    label: "Buscar una ciudad",
    noOptions: "Escribe al menos 2 caracteres para buscar...",
    loading: "Buscando ciudades..."
  },
  weather: {
    loading: "Cargando datos meteorológicos...",
    feelsLike: "Sensación",
    minMax: "MÍN / MÁX",
    humidity: "HUMEDAD",
    wind: "VIENTO",
    pressure: "PRESIÓN"
  },
  units: {
    celsius: "°C",
    speed: "m/s",
    pressure: "hPa"
  },
  errors: {
    apiKey: "Falta la clave API. Por favor, verifique su archivo .env",
    fetchWeather: "Error al obtener datos meteorológicos",
    fetchLocation: "Error al buscar ubicación"
  }
};

import { TranslationKeys } from './fr';

export const de: TranslationKeys = {
  app: {
    title: "Wetterstation",
    subtitle: "Entdecken Sie das Wetter auf der ganzen Welt"
  },
  search: {
    placeholder: "Paris, London, Tokio...",
    label: "Stadt suchen",
    noOptions: "Geben Sie mindestens 2 Zeichen ein...",
    loading: "Städte werden gesucht..."
  },
  weather: {
    loading: "Wetterdaten werden geladen...",
    feelsLike: "Gefühlt",
    minMax: "MIN / MAX",
    humidity: "LUFTFEUCHTIGKEIT",
    wind: "WIND",
    pressure: "LUFTDRUCK"
  },
  units: {
    celsius: "°C",
    speed: "m/s",
    pressure: "hPa"
  },
  errors: {
    apiKey: "API-Schlüssel fehlt. Bitte überprüfen Sie Ihre .env-Datei",
    fetchWeather: "Fehler beim Abrufen der Wetterdaten",
    fetchLocation: "Fehler bei der Standortsuche"
  }
};

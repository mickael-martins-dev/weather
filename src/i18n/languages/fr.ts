export const fr = {
  app: {
    title: "Station Météo",
    subtitle: "Découvrez la météo dans le monde entier"
  },
  search: {
    placeholder: "Paris, Londres, Tokyo...",
    label: "Rechercher une ville",
    noOptions: "Tapez au moins 2 caractères pour rechercher...",
    loading: "Recherche de villes..."
  },
  weather: {
    loading: "Chargement des données météo...",
    feelsLike: "Ressenti",
    minMax: "MIN / MAX",
    humidity: "HUMIDITÉ",
    wind: "VENT",
    pressure: "PRESSION"
  },
  units: {
    celsius: "°C",
    speed: "m/s",
    pressure: "hPa"
  },
  errors: {
    apiKey: "Clé API manquante. Vérifiez votre fichier .env",
    fetchWeather: "Erreur lors de la récupération de la météo",
    fetchLocation: "Erreur lors de la recherche de localisation"
  }
};

export type TranslationKeys = typeof fr;

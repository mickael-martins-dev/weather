import { fr, TranslationKeys } from './languages/fr';
import { en } from './languages/en';
import { es } from './languages/es';
import { de } from './languages/de';

export interface Language {
  code: string;
  name: string;
  flag: string;
  translations: TranslationKeys;
  weatherApiCode: string;
  geoApiCode: string;
}

export const languages: Record<string, Language> = {
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    translations: fr,
    weatherApiCode: 'fr',
    geoApiCode: 'fr'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    translations: en,
    weatherApiCode: 'en',
    geoApiCode: 'en'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    translations: es,
    weatherApiCode: 'es',
    geoApiCode: 'es'
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    translations: de,
    weatherApiCode: 'de',
    geoApiCode: 'de'
  }
};

export const defaultLanguage = 'fr';

export const getLanguage = (code: string): Language => {
  return languages[code] || languages[defaultLanguage];
};

export const getAvailableLanguages = (): Language[] => {
  return Object.values(languages);
};

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getLanguage, defaultLanguage, Language } from '../i18n';

const STORAGE_KEY = 'weather-app-language';

interface LanguageContextType {
  currentLang: string;
  language: Language;
  changeLanguage: (langCode: string) => void;
  t: (key: string) => string;
  weatherApiLang: string;
  geoApiLang: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || defaultLanguage;
  });

  const language = getLanguage(currentLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLang);
  }, [currentLang]);

  const changeLanguage = useCallback((langCode: string) => {
    setCurrentLang(langCode);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = language.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [language]);

  const value: LanguageContextType = {
    currentLang,
    language,
    changeLanguage,
    t,
    weatherApiLang: language.weatherApiCode,
    geoApiLang: language.geoApiCode,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

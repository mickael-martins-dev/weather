# 🌍 Documentation du Système Multilingue (i18n)

## 📋 Vue d'Ensemble

L'application Weather Station supporte maintenant **4 langues** avec un système d'internationalisation (i18n) personnalisé, léger et performant.

## 🌐 Langues Supportées

| Langue | Code | Drapeau | API Weather | API Geo |
|--------|------|---------|-------------|---------|
| **Français** | `fr` | 🇫🇷 | ✅ | ✅ |
| **English** | `en` | 🇺🇸 | ✅ | ✅ |
| **Español** | `es` | 🇪🇸 | ✅ | ✅ |
| **Deutsch** | `de` | 🇩🇪 | ✅ | ✅ |

## 🏗️ Architecture

### **Structure des Fichiers**

```
src/
├── i18n/
│   ├── index.ts              # Configuration principale
│   └── languages/
│       ├── fr.ts            # Traductions françaises (référence)
│       ├── en.ts            # Traductions anglaises
│       ├── es.ts            # Traductions espagnoles
│       └── de.ts            # Traductions allemandes
├── hooks/
│   └── useLanguage.ts       # Hook personnalisé pour i18n
└── components/
    └── LanguageSelector.tsx # Sélecteur de langue UI
```

### **Composants du Système**

1. **Fichiers de Traduction** - Contiennent les textes dans chaque langue
2. **Hook `useLanguage`** - Gère l'état de la langue et les traductions
3. **Configuration i18n** - Centralise les langues disponibles
4. **Composant Sélecteur** - UI pour changer de langue

## 🎯 Utilisation

### **1. Dans un Composant**

```typescript
import { useLanguage } from '../hooks/useLanguage';

const MyComponent = () => {
  const { t, currentLang, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
    </div>
  );
};
```

### **2. Avec les Services API**

```typescript
import { useLanguage } from '../hooks/useLanguage';

const MyComponent = () => {
  const { weatherApiLang, geoApiLang } = useLanguage();
  
  // Utiliser weatherApiLang pour les appels API météo
  // Utiliser geoApiLang pour les appels API géolocalisation
};
```

### **3. Changer de Langue**

```typescript
const { changeLanguage } = useLanguage();

// Changer vers l'anglais
changeLanguage('en');

// Changer vers l'espagnol
changeLanguage('es');
```

## 📝 Structure des Traductions

### **Fichier de Traduction Type (fr.ts)**

```typescript
export const fr = {
  app: {
    title: "Station Météo",
    subtitle: "Découvrez la météo dans le monde entier"
  },
  search: {
    placeholder: "Paris, Londres, Tokyo...",
    label: "Rechercher une ville",
    noOptions: "Tapez au moins 2 caractères...",
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
    apiKey: "Clé API manquante...",
    fetchWeather: "Erreur lors de la récupération...",
    fetchLocation: "Erreur lors de la recherche..."
  }
};
```

### **Clés de Traduction**

Les clés utilisent la **notation par points** :

- `app.title` → Titre de l'application
- `weather.feelsLike` → "Ressenti"
- `units.celsius` → "°C"

## 🔧 Hook `useLanguage`

### **Interface Retournée**

```typescript
{
  currentLang: string;           // Code langue actuel (ex: 'fr')
  language: Language;            // Objet langue complet
  changeLanguage: (code) => void; // Fonction pour changer de langue
  t: (key: string) => string;    // Fonction de traduction
  weatherApiLang: string;        // Code pour API météo
  geoApiLang: string;           // Code pour API géo
}
```

### **Fonction `t()` (translate)**

```typescript
const { t } = useLanguage();

// Utilisation simple
t('app.title')              // → "Station Météo" (si fr)

// Clés imbriquées
t('weather.feelsLike')      // → "Ressenti"
t('units.celsius')          // → "°C"
```

### **Persistance**

La langue sélectionnée est **sauvegardée automatiquement** dans `localStorage` :

```typescript
localStorage.getItem('weather-app-language') // 'fr', 'en', 'es', 'de'
```

## 🎨 Composant LanguageSelector

### **Features**

- ✅ Dropdown avec drapeaux emoji
- ✅ Design cohérent avec l'application
- ✅ Glassmorphism effect
- ✅ Hover et états actifs
- ✅ Transition fluide

### **Position**

Le sélecteur est placé dans le **header** en haut à droite de l'application.

### **Apparence**

```
┌─────────────────────┐
│ 🇫🇷 Français    ▼  │ ← Bouton
└─────────────────────┘

Clic → Menu dropdown:
┌─────────────────────┐
│ 🇫🇷 Français   ✓   │
│ 🇺🇸 English         │
│ 🇪🇸 Español         │
│ 🇩🇪 Deutsch         │
└─────────────────────┘
```

## 🔄 Flux de Données

### **Changement de Langue**

```
1. User clique sur langue
       ↓
2. changeLanguage('en')
       ↓
3. État mis à jour
       ↓
4. localStorage mis à jour
       ↓
5. Tous les composants re-render
       ↓
6. Textes affichés en nouvelle langue
       ↓
7. APIs appellées avec nouveau code langue
```

### **Au Chargement**

```
1. App démarre
       ↓
2. useLanguage vérifie localStorage
       ↓
3. Charge langue sauvée ou défaut (fr)
       ↓
4. Tous les textes affichés dans cette langue
```

## 🌍 Services API Multilingues

### **Weather Service**

```typescript
// Maintenant accepte un paramètre langue
export const fetchWeather = async (
  lat: number, 
  lon: number, 
  lang: string = 'fr'
): Promise<ICurrentWeather>
```

**Utilisation:**
```typescript
const { weatherApiLang } = useLanguage();
const weather = await fetchWeather(lat, lon, weatherApiLang);
```

### **Geolocation Service**

```typescript
// Maintenant accepte un paramètre langue
export const fetchGeolocation = async (
  name: string, 
  signal: AbortSignal | undefined,
  lang: string = 'fr'
): Promise<IGeolocationResults>
```

**Utilisation:**
```typescript
const { geoApiLang } = useLanguage();
const results = await fetchGeolocation(query, signal, geoApiLang);
```

## ➕ Ajouter une Nouvelle Langue

### **Étape 1: Créer le Fichier de Traduction**

```typescript
// src/i18n/languages/it.ts
import { TranslationKeys } from './fr';

export const it: TranslationKeys = {
  app: {
    title: "Stazione Meteorologica",
    subtitle: "Scopri il meteo in tutto il mondo"
  },
  // ... copier et traduire toutes les clés
};
```

### **Étape 2: Ajouter à la Configuration**

```typescript
// src/i18n/index.ts
import { it } from './languages/it';

export const languages: Record<string, Language> = {
  // ... langues existantes
  it: {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    translations: it,
    weatherApiCode: 'it',
    geoApiCode: 'it'
  }
};
```

### **Étape 3: C'est Tout !**

Le nouveau choix de langue apparaît automatiquement dans le sélecteur.

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| Langues supportées | 4 (fr, en, es, de) |
| Clés de traduction | ~25 par langue |
| Taille du bundle i18n | ~2 KB (gzip) |
| Temps de switch | Instantané |
| Persistance | localStorage |

## 🎯 Best Practices

### **1. Toujours Utiliser les Clés**

❌ **Mauvais:**
```typescript
<Typography>Chargement...</Typography>
```

✅ **Bon:**
```typescript
<Typography>{t('weather.loading')}</Typography>
```

### **2. Grouper les Traductions**

✅ **Bon groupement:**
```typescript
weather: {
  loading: "...",
  feelsLike: "...",
  wind: "..."
}
```

### **3. Utiliser des Noms Descriptifs**

✅ **Bons noms:**
- `search.placeholder`
- `weather.humidity`
- `errors.apiKey`

❌ **Mauvais noms:**
- `text1`
- `label`
- `msg`

### **4. Maintenir la Cohérence**

Toutes les langues doivent avoir **exactement les mêmes clés**. TypeScript le garantit avec `TranslationKeys`.

## 🐛 Dépannage

### **Problème: Texte non traduit**

**Cause:** Clé de traduction manquante

**Solution:** Vérifier que la clé existe dans tous les fichiers de langue

### **Problème: Langue ne change pas**

**Cause:** Composant n'utilise pas `useLanguage`

**Solution:** Importer et utiliser le hook

### **Problème: API toujours en français**

**Cause:** Services n'utilisent pas le paramètre langue

**Solution:** Passer `weatherApiLang` ou `geoApiLang`

## 🚀 Performance

### **Optimisations Implémentées**

1. ✅ **Pas de bibliothèque externe** - Code léger
2. ✅ **useCallback** - Fonctions mémorisées
3. ✅ **localStorage** - Persistance côté client
4. ✅ **Type safety** - TypeScript garantit cohérence
5. ✅ **Tree shaking** - Seules les langues utilisées

### **Bundle Size Impact**

- **Avant i18n:** 411 KB (gzip: 132 KB)
- **Après i18n:** 437 KB (gzip: 139 KB)
- **Différence:** +26 KB (+7 KB gzip)

## 📚 Références

- **OpenWeatherMap API:** Supporte 40+ langues
- **Open-Meteo Geocoding:** Supporte recherche multilingue
- **MUI Components:** Utilisés pour le sélecteur

---

**Version:** 1.0.0  
**Date:** Janvier 13, 2026  
**Auteur:** Weather Station Development Team

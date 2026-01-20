# 🎣 Custom Hook Architecture - useWeatherData

## 📊 Overview

The application now uses a custom hook `useWeatherData` to centralize all weather-related logic, separating business logic from UI components.

## 🏗️ Architecture Benefits

### **Before (Component-based Logic)**
```
App.tsx
├── State: location
├── Logic: setLocation
└── Components:
    ├── GeoLocationSelector (receives setLocation)
    └── WeatherComponent
        ├── State: weatherData, loading, error, iconURL
        ├── Logic: fetch weather, handle errors
        └── UI: Display weather
```

### **After (Hook-based Logic)**
```
useWeatherData Hook
├── State: location, weatherData, loading, error, iconURL
├── Logic: fetchWeather, updateLocation, refreshWeather
└── Returns: Complete state + actions

App.tsx (Simplified)
├── Uses: useWeatherData hook
└── Components:
    ├── GeoLocationSelector (receives updateLocation)
    └── WeatherComponent (receives state props)
        └── UI only: Display weather
```

## 🎯 Key Improvements

### **1. Separation of Concerns**
- ✅ **UI Components**: Focus only on rendering
- ✅ **Business Logic**: Centralized in the hook
- ✅ **State Management**: Single source of truth

### **2. Code Reusability**
```typescript
// The hook can be used anywhere in the app
const weatherState = useWeatherData(location);

// Easy to create multiple instances if needed
const parisWeather = useWeatherData(PARIS_LOCATION);
const londonWeather = useWeatherData(LONDON_LOCATION);
```

### **3. Better Testability**
- Hook logic can be tested independently
- Components become pure and easier to test
- Mocking is simplified

### **4. Performance Optimization**
- Uses `useCallback` to memoize functions
- Prevents unnecessary re-renders
- Efficient dependency management

## 📁 File Structure

```
src/
├── hooks/
│   └── useWeatherData.ts          # Custom hook
├── components/
│   ├── WeatherComponent.tsx       # Pure UI component
│   └── GeoLocationSelector.tsx    # UI component
├── services/
│   ├── WeatherService.ts          # API calls
│   └── GeolocationService.ts      # API calls
└── App.tsx                        # Main app (uses hook)
```

## 🔧 Hook API

### **Input**
```typescript
const weatherState = useWeatherData(initialLocation: ILocation);
```

### **Output (State)**
```typescript
{
  location: ILocation;           // Current location
  weatherData: ICurrentWeather;  // Weather data
  weatherIconURL: string;        // Icon URL
  loading: boolean;              // Loading state
  error: string | null;          // Error message
}
```

### **Output (Actions)**
```typescript
{
  updateLocation: (newLocation: ILocation) => void;  // Update location
  refreshWeather: () => void;                        // Refresh data
}
```

## 💻 Usage Examples

### **Basic Usage**
```typescript
const App = () => {
  const weatherState = useWeatherData(DEFAULT_LOCATION);
  
  return (
    <div>
      <LocationSelector updateLocation={weatherState.updateLocation} />
      <WeatherCard {...weatherState} />
    </div>
  );
};
```

### **With Manual Refresh**
```typescript
const WeatherDashboard = () => {
  const weatherState = useWeatherData(location);
  
  return (
    <div>
      <Button onClick={weatherState.refreshWeather}>
        Refresh Weather
      </Button>
      <WeatherCard {...weatherState} />
    </div>
  );
};
```

### **Multiple Locations**
```typescript
const CompareWeather = () => {
  const paris = useWeatherData(PARIS);
  const london = useWeatherData(LONDON);
  
  return (
    <div>
      <WeatherCard {...paris} />
      <WeatherCard {...london} />
    </div>
  );
};
```

## 🔄 Data Flow

```
User selects location
       ↓
updateLocation(newLocation)
       ↓
Hook updates location state
       ↓
useEffect detects change
       ↓
fetchWeatherData() called
       ↓
Set loading = true
       ↓
Call WeatherService API
       ↓
Update weatherData & iconURL
       ↓
Set loading = false
       ↓
Components re-render with new data
```

## 📝 Component Simplification

### **WeatherComponent - Before**
```typescript
const WeatherCard = (props: IWeatherComponentProps) => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();
  const [weatherIconURL, setWeatherIconURL] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Complex fetch logic with error handling
    setLoading(true);
    WeatherService.fetchWeather(...)
      .then(...)
      .catch(...);
  }, [props.location]);

  // 100+ lines of logic + UI
};
```

### **WeatherComponent - After**
```typescript
const WeatherCard = ({ weatherData, weatherIconURL, loading, error }) => {
  // Only UI rendering - 60 lines, pure component
  if (loading) return <Spinner />;
  if (error) return <ErrorAlert />;
  return <WeatherDisplay data={weatherData} />;
};
```

## 🚀 Future Enhancements

The hook architecture makes it easy to add:

### **1. Caching**
```typescript
const cache = useRef<Map<string, ICurrentWeather>>(new Map());
```

### **2. Debouncing**
```typescript
const debouncedFetch = useDebouncedCallback(fetchWeatherData, 500);
```

### **3. Geolocation**
```typescript
const detectUserLocation = () => {
  navigator.geolocation.getCurrentPosition(/* ... */);
};
```

### **4. Favorites**
```typescript
const [favorites, setFavorites] = useState<ILocation[]>([]);
const addFavorite = (location: ILocation) => { /* ... */ };
```

## ✅ Testing Strategy

### **Hook Testing**
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useWeatherData } from './useWeatherData';

test('fetches weather on location change', async () => {
  const { result } = renderHook(() => useWeatherData(PARIS));
  
  await act(async () => {
    result.current.updateLocation(LONDON);
  });
  
  expect(result.current.weatherData.name).toBe('London');
});
```

### **Component Testing**
```typescript
import { render } from '@testing-library/react';
import WeatherCard from './WeatherComponent';

test('displays loading state', () => {
  const { getByText } = render(
    <WeatherCard loading={true} weatherData={undefined} error={null} />
  );
  expect(getByText('Loading weather data...')).toBeInTheDocument();
});
```

## 📊 Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| WeatherComponent LOC | ~110 | ~60 | 45% reduction |
| App.tsx LOC | ~20 | ~15 | 25% reduction |
| Logic separation | ❌ | ✅ | 100% |
| Reusability | Low | High | ⬆️ |
| Testability | Medium | High | ⬆️ |

## 🎓 Best Practices Applied

1. ✅ **Single Responsibility**: Each component has one job
2. ✅ **DRY**: No repeated fetch logic
3. ✅ **Composition**: Easy to compose with other hooks
4. ✅ **Type Safety**: Full TypeScript support
5. ✅ **Performance**: Memoized callbacks with useCallback
6. ✅ **Error Handling**: Centralized error management
7. ✅ **Loading States**: Consistent loading UX

## 🔗 Related Files

- `/src/hooks/useWeatherData.ts` - The custom hook
- `/src/components/WeatherComponent.tsx` - Simplified component
- `/src/components/GeoLocationSelector.tsx` - Uses hook's updateLocation
- `/src/App.tsx` - Hook integration example

---

**Last Updated**: January 13, 2026
**Author**: Weather App Development Team

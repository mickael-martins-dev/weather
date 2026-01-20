import { Box, Typography, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import GeoLocationSelectorComponent from './components/GeoLocationSelector';
import WeatherCard from './components/WeatherComponent';
import LanguageSelector from './components/LanguageSelector';
import { useWeatherData } from './hooks/useWeatherData';
import { useLanguage } from './contexts/LanguageContext';
import { getWeatherTheme } from './utils/weatherTheme';

const DEFAULT_LOCATION = {
  city: "Paris",
  lon: 2.3522,
  lat: 48.8566
};

const App = () => {
  const { t, weatherApiLang } = useLanguage();
  const weatherState = useWeatherData(DEFAULT_LOCATION, weatherApiLang);

  const theme = weatherState.weatherData
    ? getWeatherTheme(weatherState.weatherData.weather[0].main)
    : { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.gradient,
        padding: { xs: 1.5, md: 2 },
        transition: 'background 0.5s ease',
      }}
    >
      <Container maxWidth="md">
        {/* Header with Language Selector */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Box sx={{ flex: 1 }} />
          <LanguageSelector />
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            mb: 2,
            animation: 'fadeIn 0.5s ease-in'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 0.5,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            🌤️ {t('app.title')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            {t('app.subtitle')}
          </Typography>
        </Box>

        {/* Search Bar */}
        <Paper
          elevation={3}
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <GeoLocationSelectorComponent updateLocation={weatherState.updateLocation} />
        </Paper>

        {/* Weather Card */}
        <Box sx={{ animation: 'slideUp 0.5s ease-out' }}>
          <WeatherCard {...weatherState} />
        </Box>
      </Container>
    </Box>
  );
}

export default App

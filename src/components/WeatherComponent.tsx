import { Card, CardContent, Typography, CircularProgress, Alert, Box, Grid, Chip, Stack } from "@mui/material";
import { ICurrentWeather } from "../models";
import { getWeatherTheme, getWeatherEmoji } from "../utils/weatherTheme";
import { useLanguage } from "../contexts/LanguageContext";

export interface IWeatherComponentProps {
  weatherData: ICurrentWeather | undefined;
  weatherIconURL: string;
  loading: boolean;
  error: string | null;
}

const WeatherCard = ({ weatherData, weatherIconURL, loading, error }: IWeatherComponentProps) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <Card 
        elevation={4}
        sx={{ 
          padding: 4, 
          textAlign: 'center',
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography sx={{ mt: 3, fontSize: '1.1rem', color: '#666666' }}>
          {t('weather.loading')}
        </Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card 
        elevation={4}
        sx={{ 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CardContent>
          <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return null;
  }

  const theme = getWeatherTheme(weatherData.weather[0].main);
  const emoji = getWeatherEmoji(weatherData.weather[0].main);

  return (
    <Card 
      elevation={6}
      sx={{ 
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }
      }}
    >
      {/* Hero Section with Large Icon and Temperature */}
      <Box 
        sx={{ 
          background: theme.gradient,
          padding: { xs: 2.5, md: 3 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Large Weather Icon */}
        <Box
          component="img"
          src={weatherIconURL}
          alt={weatherData.weather[0].description}
          sx={{
            width: { xs: 120, md: 160 },
            height: { xs: 120, md: 160 },
            margin: '0 auto',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            animation: 'float 3s ease-in-out infinite',
          }}
        />

        {/* Temperature - Hero Style */}
        <Box sx={{ mt: 1 }}>
          <Typography 
            variant="h1" 
            component="div"
            sx={{ 
              fontWeight: 900,
              color: 'white',
              fontSize: { xs: '3.5rem', md: '4.5rem' },
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              lineHeight: 1,
            }}
          >
            {Math.round(weatherData.main.temp)}°
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 500,
              mt: 0.5,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {t('weather.feelsLike')} {Math.round(weatherData.main.feels_like)}°
          </Typography>

          {/* City Name */}
          <Box sx={{ mt: 1.5 }}>
            <Typography 
              variant="h5" 
              component="div"
              sx={{ 
                fontWeight: 700,
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              {emoji} {weatherData.name}
            </Typography>
            
            <Chip 
              label={weatherData.weather[0].description}
              sx={{ 
                mt: 1,
                textTransform: 'capitalize',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                padding: '6px 12px',
                height: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ padding: { xs: 2, md: 2.5 } }}>


        {/* Weather Details Grid */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'rgba(100, 150, 250, 0.15)',
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }} display="block">
                  {t('weather.minMax')}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a1a' }}>
                  {Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'rgba(100, 200, 250, 0.15)',
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }} display="block">
                  💧 {t('weather.humidity')}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a1a' }}>
                  {weatherData.main.humidity}%
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'rgba(150, 100, 250, 0.15)',
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }} display="block">
                  🌬️ {t('weather.wind')}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a1a' }}>
                  {weatherData.wind.speed} {t('units.speed')}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'rgba(200, 100, 250, 0.15)',
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: '#666666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }} display="block">
                  📊 {t('weather.pressure')}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1a1a1a' }}>
                  {weatherData.main.pressure} {t('units.pressure')}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

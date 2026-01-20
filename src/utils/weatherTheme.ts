export interface WeatherTheme {
  gradient: string;
  cardBackground: string;
  textColor: string;
  iconColor: string;
}

export const getWeatherTheme = (weatherMain: string): WeatherTheme => {
  const weather = weatherMain.toLowerCase();

  switch (weather) {
    case 'clear':
      return {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        textColor: '#667eea',
        iconColor: '#FDB813'
      };
    
    case 'clouds':
      return {
        gradient: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(117, 127, 154, 0.1), rgba(215, 221, 232, 0.1))',
        textColor: '#757F9A',
        iconColor: '#95A5A6'
      };
    
    case 'rain':
    case 'drizzle':
      return {
        gradient: 'linear-gradient(135deg, #4CA1AF 0%, #2C3E50 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(76, 161, 175, 0.1), rgba(44, 62, 80, 0.1))',
        textColor: '#4CA1AF',
        iconColor: '#3498DB'
      };
    
    case 'thunderstorm':
      return {
        gradient: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(55, 59, 68, 0.1), rgba(66, 134, 244, 0.1))',
        textColor: '#4286f4',
        iconColor: '#F39C12'
      };
    
    case 'snow':
      return {
        gradient: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(224, 234, 252, 0.1), rgba(207, 222, 243, 0.1))',
        textColor: '#7F8C8D',
        iconColor: '#ECF0F1'
      };
    
    case 'mist':
    case 'fog':
    case 'haze':
      return {
        gradient: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(96, 108, 136, 0.1), rgba(63, 76, 107, 0.1))',
        textColor: '#606c88',
        iconColor: '#95A5A6'
      };
    
    default:
      return {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBackground: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        textColor: '#667eea',
        iconColor: '#FDB813'
      };
  }
};

export const getWeatherEmoji = (weatherMain: string): string => {
  const weather = weatherMain.toLowerCase();
  
  switch (weather) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'drizzle': return '🌦️';
    case 'thunderstorm': return '⛈️';
    case 'snow': return '❄️';
    case 'mist':
    case 'fog':
    case 'haze': return '🌫️';
    default: return '🌤️';
  }
};

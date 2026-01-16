
import { ICurrentWeather } from '../models';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const UNITS = 'metric'

export const fetchWeather = async (lat: number, lon: number, lang: string = 'fr'): Promise<ICurrentWeather> => {
    if (!API_KEY) {
        throw new Error('Missing API Key. Please check your .env file');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${UNITS}&appid=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json() as ICurrentWeather;
    return result;
}

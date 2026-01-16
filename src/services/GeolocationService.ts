import { IGeolocationResults } from "../models";

export const fetchGeolocation = async (name: string, signal: AbortSignal | undefined, lang: string = 'fr'): Promise<IGeolocationResults> => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=${lang}&format=json`
    const response = await fetch(url, { signal });
    
    if (!response.ok) {
        throw new Error(`Geolocation API Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json() as IGeolocationResults;

    // Sometimes the result is empty, fix it
    if (result.results === undefined) {
        result.results = [];
    }

    return result;
}

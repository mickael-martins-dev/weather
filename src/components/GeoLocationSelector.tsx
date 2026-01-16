import { useState, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IGeolocationResult } from '../models';
import * as GeolocationService from '../services/GeolocationService';
import { ILocation } from '../hooks/useWeatherData';
import { useLanguage } from '../contexts/LanguageContext';

export interface IProps {
    updateLocation(location: ILocation): void;
}

const GeoLocationSelectorComponent = (props: IProps) => {
    const { t, geoApiLang } = useLanguage();
    const [locations, setLocations] = useState<IGeolocationResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const handleInputChange = (value: string) => {
        if (!value || value.length < 2) {
            setLocations([]);
            return;
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();
        setLoading(true);

        GeolocationService
            .fetchGeolocation(value, abortControllerRef.current.signal, geoApiLang)
            .then((values) => {
                setLocations(values.results);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    console.error('Geolocation search error:', err);
                    setLocations([]);
                }
                setLoading(false);
            });
    };

    return (
        <Autocomplete
            id="location-select"
            options={locations}
            loading={loading}
            getOptionLabel={(option: IGeolocationResult) => option.name}
            noOptionsText={t('search.noOptions')}
            loadingText={t('search.loading')}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                        borderWidth: 2,
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#666666',
                    '&.Mui-focused': {
                        color: '#667eea',
                    },
                },
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                const iconURL = `https://hatscripts.github.io/circle-flags/flags/${option.country_code.toLowerCase()}.svg`;
                return (
                    <Box
                        key={`${option.id}-${option.latitude}-${option.longitude}`}
                        component="li"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            padding: '12px 16px !important',
                            '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.08)',
                            },
                        }}
                        {...optionProps}
                    >
                        <Box
                            component="img"
                            src={iconURL}
                            alt={option.country_code}
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.25,
                                }}
                            >
                                {option.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#666666',
                                    display: 'block',
                                }}
                            >
                                {option.admin1 ? `${option.admin1}, ` : ''}{option.country}
                            </Typography>
                        </Box>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={`🔍 ${t('search.label')}`}
                    placeholder={t('search.placeholder')}
                    variant="outlined"
                    slotProps={{
                        htmlInput: {
                            ...params.inputProps,
                            autoComplete: 'new-password',
                            style: {
                                color: '#1a1a1a',
                                fontSize: '1rem',
                            }
                        },
                    }}
                    onChange={(event) => handleInputChange(event.target.value)}
                    sx={{
                        '& input': {
                            color: '#1a1a1a',
                        },
                    }}
                />
            )}
            onChange={(_event: any, newValue: IGeolocationResult | null) => {
                if (newValue) {
                    props.updateLocation({
                        city: newValue.name,
                        lat: newValue.latitude,
                        lon: newValue.longitude
                    });
                }
            }}
        />
    );
}

export default GeoLocationSelectorComponent;

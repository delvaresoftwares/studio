import { useState, useEffect } from 'react';

interface LocationData {
    country: string;
    countryCode: string; // e.g., 'US', 'IN', 'GB'
    city: string;
    isLoading: boolean;
}

export const useLocation = () => {
    const [location, setLocation] = useState<LocationData>({
        country: 'United States',
        countryCode: 'US',
        city: 'Unknown',
        isLoading: true,
    });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                if (data.country_name) {
                    setLocation({
                        country: data.country_name,
                        countryCode: data.country_code,
                        city: data.city,
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch location:', error);
                // Fallback to default (US)
                setLocation(prev => ({ ...prev, isLoading: false }));
            }
        };

        fetchLocation();
    }, []);

    return location;
};

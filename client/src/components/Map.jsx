import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const getCoordinates = async (city, retries = 3) => {
    const apiKey = 'pk.7a436f7e24cfa522fb358e785cfdb119'; // 
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(city)}&format=json`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const location = response.data[0];
            return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        } else {
            console.error('No results found for:', city);
            return null;
        }
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log(`Rate limit reached. Retrying in 2 seconds... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));  
            return getCoordinates(city, retries - 1); 
        } else {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    }
};

const containerStyle = {
    width: '100%',
    height: '400px',
};

const Map = ({ locations, onMarkerClick }) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);


    const center = {
        lat: 40.7128, 
        lng: -74.0060,
    };

    useEffect(() => {
        const uniqueLocations = [...new Set(locations)]; 
        const fetchCoordinates = async () => {
            if (uniqueLocations.length > 0) {
                const updatedMarkers = await Promise.all(
                    locations.map(async (destination) => {
                        const coords = await getCoordinates(destination);
                        return coords; 
                    })
                );
                setMarkers(updatedMarkers.filter(marker => marker !== null));
            }
        };

        fetchCoordinates();
    }, [locations]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDFiSqCPHcpchEa4jsodF-z_z82_B3ePEk">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                onLoad={(map) => setMap(map)}
            >
                {markers.map((position, index) => (
                    <Marker key={index} position={position} 
                    onClick={() => onMarkerClick(locations[index])}/>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
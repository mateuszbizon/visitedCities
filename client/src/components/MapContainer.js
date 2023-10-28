import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"

function MapContainer() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })
    const coords = { lat: 0, lng: 0 }

    if (!isLoaded) return <div>Loading Map...</div>

    return (
        <div className='map-container'>
            <GoogleMap
                center={coords}
                zoom={3}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            >
            </GoogleMap>
        </div>
      );
}

export default MapContainer
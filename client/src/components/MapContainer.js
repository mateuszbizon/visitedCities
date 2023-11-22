import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"

function MapContainer({ allUserLocations }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
    })
    const coords = { lat: 51, lng: 20 }

    if (!isLoaded) return <div>Loading Map...</div>

    return (
        <div className='map-container'>
            <GoogleMap
                center={coords}
                zoom={6}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            >
                {allUserLocations.map((place, index) => (
                    <Marker key={index} position={{ lat: place.latitude, lng: place.longitude }} onClick={() => console.log(place)} />
                ))}
            </GoogleMap>
        </div>
      );
}

export default MapContainer
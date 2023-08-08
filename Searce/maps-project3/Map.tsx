import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1500px',
  height: '1000px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBsrZpwl_ulQL5_C7nAMV-fnxJGrPekMUY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

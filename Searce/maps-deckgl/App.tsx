import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import DeckGLComponent from './components/DeckGlComponent';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBsrZpwl_ulQL5_C7nAMV-fnxJGrPekMUY';

const INITIAL_VIEW_STATE = {
  latitude: 37.7853,
  longitude: -122.41669,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

function App() {

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      {/* Render DeckGL layers as overlays */}
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '80vh' }}
          center={{ lat: INITIAL_VIEW_STATE.latitude, lng: INITIAL_VIEW_STATE.longitude }}
          zoom={INITIAL_VIEW_STATE.zoom} >

          <DeckGLComponent>
            
          </DeckGLComponent>
          </GoogleMap>
    </LoadScript>
  );
}

export default App;

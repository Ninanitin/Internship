import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer } from "deck.gl";

const EARTHQUAKES_DATA = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

const containerStyle = {
  width: '1500px',
  height: '1000px',
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    center: { lat: 34.052235, lng: -118.243683 },
    tilt: 30,
    mapId: "90f87356969d889c",
    zoom: 7,
    googleMapsApiKey: "API_KEY"
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const earthquakesLayer = new GeoJsonLayer({
      id: "earthquakes",
      data: EARTHQUAKES_DATA,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusMaxPixels: 200,
      opacity: 0.4,
      pointRadiusScale: 0.3,
      getRadius: (f) => Math.pow(10, f.properties.mag),
      getFillColor: [255, 70, 30, 180],
      autoHighlight: true,
      transitions: {
        getRadius: {
          type: "spring",
          stiffness: 0.1,
          damping: 0.15,
          enter: () => [0],
          duration: 10000,
        },
      },
      onDataLoad: () => {
        // You can add any necessary code here when data is loaded
      },
    });

    const overlay = new GoogleMapsOverlay({
      layers: [earthquakesLayer],
    });

    overlay.setMap(map);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 34.052235, lng: -118.243683 }}
      mapId="fae05836df2dc8bb"
      tilt={45}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker
        onClick={() => {
          // You can add any marker-related code here
        }}
        position={{ lat: 40.72, lng: -74 }}
      /> */}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent);

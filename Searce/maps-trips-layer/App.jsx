import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { TripsLayer } from "deck.gl";
//import { ArcLayer} from "deck.gl";
//import { GoogleMapsOverlay } from "@deck.gl/google-maps";

//const GoogleMapsOverlay = deck.GoogleMapsOverlay;
//const TripsLayer = deck.TripsLayer;
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json";
const LOOP_LENGTH = 1800;
const VENDOR_COLORS = [
  [255, 0, 0],
  [0, 0, 255], // vendor #1
];
const containerStyle = {
  width: '1500px',
  height: '1000px',
  //zoom: 1
};

// let defaultCenter = {
//   lat: 33.4481,
//   lng: -112.0740
// };

// const marker1 = {
//   lat: 33.448436771834146,
//   lng: -112.07360130672959
// };

// const marker2 = {
//   lat: 33.44761966743808,
//   lng: -112.0746530383528
// };

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'fae05836df2dc8b',
    googleMapsApiKey: "API_KEY"
  })

  const [map, setMap] = React.useState(null)
  // const [center, setCenter] = useState(defaultCenter)
  // const [myZoom, setMyZoom] = useState(10)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    let currentTime = 0;
    const props = {
      id: "trips",
      data: DATA_URL,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => VENDOR_COLORS[d.vendor],
      opacity: 1,
      widthMinPixels: 2,
      trailLength: 180,
      currentTime,
      shadowEnabled: false,
    };
    const overlay = new GoogleMapsOverlay({});

    const animate = () => {
      currentTime = (currentTime + 1) % LOOP_LENGTH;

      const tripsLayer = new TripsLayer({
        ...props,
        currentTime,
      });

      overlay.setProps({
        layers: [tripsLayer],
      });
      window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
    overlay.setMap(map);


    setMap(map)
  }, [])


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={ { lat: 40.72, lng: -74 }}
      mapId= "fae05836df2dc8bb"
      tilt= {45}
      zoom= {15}
      //zoom={myZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker onClick={() => {
        setMyZoom(12)
        setCenter(marker1)
      }} position={{ lat: 40.72, lng: -74 }}>

      </Marker> */}
      

      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
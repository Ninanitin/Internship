import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

export default function GoogleMaps() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <div>Error</div>;
  }
  return <Map googleMapsApiKey={googleMapsApiKey} />;
}

type Coordinates = {
  lat: number;
  lng: number;
};

type MapProps = {
  googleMapsApiKey: string;
};

function Map({ googleMapsApiKey }: MapProps) {
  const center: Coordinates = useMemo(() => ({ lat: 38.886518, lng: -121.0166301 }), []);

  const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(center);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="my-8 mx-20 md:my-10">
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        <Marker
          position={center}
          onClick={() => {
            setSelectedMarker(center);
          }}
        />

        {selectedMarker && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
            position={center}
          >
            <a
              href="https://www.google.com/maps/dir/api=1&amp;destination=3006%20CA-49,%20Cool,%20CA%2095614,%20USA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="open link to directions to cool gym hwy 49"
              className="underline hover:text-blue-750"
            >
              Directions
            </a>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

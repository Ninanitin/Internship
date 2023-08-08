import { useState } from "react";
import DeckGL from "@deck.gl/react/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
//import { heatmapProps, scatterplotProps } from "../consts";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

export const BaseMap = ({
  layers,
  initialViewState,
  mapStyle,
}: {
  layers?: unknown[];
  initialViewState?: Record<string, unknown>;
  mapStyle?: string;
}) => {
  const [pageViewState, setPageViewState] = useState(initialViewState);

  const onViewStateChange = ({ viewState }) => {
    setPageViewState(viewState);
  };

  return (
    <DeckGL
      onViewStateChange={onViewStateChange}
      controller={true}
      viewState={pageViewState}
      layers={layers}
    >
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: pageViewState.latitude || 0,
            lng: pageViewState.longitude || 0,
          }}
          zoom={pageViewState.zoom || 1}
        >
          {/* Add other layers or components related to DeckGL */}
        </GoogleMap>
      </LoadScript>
    </DeckGL>
  );
};

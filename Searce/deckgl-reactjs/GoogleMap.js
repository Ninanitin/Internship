// Set your API key in src/googleMapsAPIKey or GoogleMapsAPIKey env var
import {map_styles} from './map_styles';
import {GoogleMapsOverlay} from '@deck.gl/google-maps';

// Initializes Google Maps JS API, draws base map and adds Deck.gl overlay
export class GoogleMapWithDeckGL {
  constructor(google_maps_api_key) {        
    this.google_maps_api_key = google_maps_api_key;
    this.api;
    this.map;
    this.overlay;
  }

  // Load the Google Maps Platform JS API async
  loadScript() {
    const GOOGLE_MAPS_API_KEY = this.google_maps_api_key || process.env.GoogleMapsAPIKey;
    const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsrZpwl_ulQL5_C7nAMV-fnxJGrPekMUY&libraries=places`;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = GOOGLE_MAPS_API_URL;    
    head.appendChild(script);
    return new Promise(resolve => {
      script.onload = resolve;
    });
  }

  async initMapWithOverlay(options) {
    // Init the Google Maps JS API and base map
    await this.loadScript();
    this.api = google.maps;
    this.overlay = new GoogleMapsOverlay();    
    this.map = new this.api.Map(document.getElementById('map'), {
      center: options.center,
      zoom: options.zoom,
      styles: map_styles
    });    

    // Put the Deck.gl overlay on the map
    this.overlay.setMap(this.map);    
  }

  // Reposition the map for selected demo
  setMap(map_options) {  
    this.map.setCenter(map_options.center);
    this.map.setZoom(map_options.zoom);    
  } 

  setLayer(deckgl_layers) {    
    this.overlay.setProps({layers: deckgl_layers});    
  }
}
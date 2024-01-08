
// Markers.tsx

import L from "leaflet";
import VenueLocationIconUrl from "../../assets/venue_location_icon.svg";

export const VenueLocationIcon = L.icon({
  iconUrl: VenueLocationIconUrl,
  iconRetinaUrl: VenueLocationIconUrl,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
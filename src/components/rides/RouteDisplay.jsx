import { useEffect, useState } from "react";
import { Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import mapService from "../../services/mapService";

// custom icons for pickup and drop
const pickupIcon = new L.Icon({
  iconUrl: "/pickup-marker.png", // You'll need to add these icons to your public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const dropoffIcon = new L.Icon({
  iconUrl: "/dropoff-marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const RouteDisplay = ({ pickup, dropoff }) => {
  // state
  const [routeData, setRouteData] = useState(null);
  const [estimates, setEstimates] = useState(null);

  useEffect(() => {
    if (pickup && dropoff) {
      // get route data
      mapService
        .getRoute(pickup, dropoff)
        .then((data) => setRouteData(data))
        .catch((err) => console.error("Error fetching estimates: ", err));

      // get time and destance
      mapService
        .getEstimates(pickup, dropoff)
        .then((data) => setEstimates(data))
        .catch((err) => console.error("Error fetching estimates: ", err));
    }

    console.log(`Estimates ${estimates}`);
  }, [pickup, dropoff]);

  if (!pickup && !dropoff) {
    return null;
  }

  return (
    <>
      {/* pickup marker */}
      <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}></Marker>

      {/* drop off marker*/}
      <Marker position={[dropoff.lat, pickup.lng]} icon={dropoffIcon}></Marker>

      {/* route lines */}
      {routeData && (
        <Polyline
          positions={routeData.features[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ])}
          color="#0066CC"
          weight={4}
          opacity={0.7}
        />
      )}
    </>
  );
};

export default RouteDisplay;

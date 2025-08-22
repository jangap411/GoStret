import { Minus, Plus, Send } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { useEffect, useState } from "react";
import mapService from "../services/mapService";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Map click handler component
const MapClickHandler = ({ onMapClick, selectionMode }) => {
  const map = useMapEvents({
    click: async (e) => {
      if (selectionMode) {
        const { lat, lng } = e.latlng;
        try {
          // Simulate reverse geocoding for now
          const address = await mapService.reverseGeocode(lat, lng);
          onMapClick({
            lat,
            lng,
            address: address || "Selected Location",
          });

          // Center the map on the selected location
          map.flyTo([lat, lng], map.getZoom());
        } catch (error) {
          console.error("Error getting address:", error);
        }
      }
    },
  });

  return null;
};

// Component to handle map center updates
const MapCenterHandler = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], map.getZoom());
    }
  }, [center, map]);

  return null;
};

const MapView = ({ children, onLocationSelect, selectionMode }) => {
  //state
  const [center, setCenter] = useState({
    lat: -9.43869006941101,
    lng: 147.1810054779053,
  }); //{ lat: -9.4123, lng: 147.1954 }); // VC default center
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          //set map center
          setCenter(location);
          if (map) {
            map.flyTo([location.lat, location.lng], 13);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map]);

  const handleMapClick = async (location) => {
    try {
      if (onLocationSelect && selectionMode) {
        onLocationSelect(location, selectionMode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative mt-2 mb-20">
      {/* Map  */}
      <div className="aspect-square bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg overflow-hidden relative">
        {/* map container */}
        <MapContainer
          center={userLocation || [center.lat, center.lng]}
          zoom={13}
          className="h-full w-full"
          whenCreated={setMap}
        >
          {/* title */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Add the mapCenterHandler to update the map center dynamically */}
          <MapCenterHandler center={userLocation} />

          {/* map click handler */}
          <MapClickHandler
            onMapClick={handleMapClick}
            selectionMode={selectionMode}
          />

          {/* set user marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup> You are here</Popup>
            </Marker>
          )}

          {children}
        </MapContainer>

        {/* Selection Mode Indicator */}
        {selectionMode && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-[400]">
            <p className="text-sm font-medium text-gray-700">
              Click on the map to select{" "}
              {selectionMode === "pickup" ? "pickup" : "dropoff"} location
            </p>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {/* <button className="bg-white rounded-lg p-2 shadow-md">
          <Plus size={16} className="text-gray-700" />
        </button>
        <button className="bg-white rounded-lg p-2 shadow-md">
          <Minus size={16} className="text-gray-700" />
        </button>
        <button className="bg-white rounded-lg p-2 shadow-md">
          <Send size={16} className="text-gray-700" />
        </button> */}
      </div>
    </div>
  );
};

export default MapView;

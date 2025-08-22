import axios from "axios";

const ORS_API_KEY = import.meta.env.VITE_OPEN_ROUTING_API_KEY;
const ORS_API_URL = import.meta.env.VITE_ORS_API_URL;

const mapService = {
  // Get route between two points
  getRoute: async (startCoords, endCoords) => {
    try {
      const response = await axios.post(
        `${ORS_API_URL}/v2/directions/driving-car/geojson`,
        {
          coordinates: [
            [startCoords.lng, startCoords.lat],
            [endCoords.lng, endCoords.lat],
          ],
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting route:", error);
      throw error;
    }
  },

  // Geocode address to coordinates
  geocodeAddress: async (address) => {
    try {
      const response = await axios.get(`${ORS_API_URL}/geocode/search`, {
        params: {
          text: address,
          size: 5,
          "boundary.country": "PG", // set boundry to PNG
        },
        headers: {
          Authorization: ORS_API_KEY,
        },
      });
      return response.data.features;
    } catch (error) {
      console.error("Error geocoding address:", error);
      throw error;
    }
  },

  // Get estimated time and distance
  getEstimates: async (startCoords, endCoords) => {
    try {
      console.log("Getting estimates for:", { startCoords, endCoords });

      // For testing purposes, calculate rough estimates
      // In production, you would use the actual API call
      const lat1 = startCoords.lat;
      const lon1 = startCoords.lng;
      const lat2 = endCoords.lat;
      const lon2 = endCoords.lng;

      // Calculate distance using Haversine formula
      const R = 6371e3; // Earth's radius in meters
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // in meters
      const duration = (distance / 13.4) * 1.5; // Assuming average speed of 48.4 km/h (13.4 m/s)

      console.log("Calculated estimates:", { distance, duration });

      return {
        distance: Math.round(distance), // distance in meters
        duration: Math.round(duration), // duration in seconds
      };
    } catch (error) {
      console.error("Error getting estimates:", error);
      throw error;
    }
  },

  async reverseGeocode(lat, lng) {
    try {
      // For demo purposes, simulate API call
      // In production, this would call a real geocoding service like Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return `Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
    }
  },
};

export default mapService;

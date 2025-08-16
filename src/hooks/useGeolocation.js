import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState([40.7128, -74.006]); // Default to NYC

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return [location, setLocation];
};

export default useGeolocation;

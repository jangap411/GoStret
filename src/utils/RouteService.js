const API_KEY = "5b3ce3597851110001cf62484036c6ff02874ec688671f7a883449e0";

const fetchRoute = async (coordinates) => {
  try {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        method: "POST",
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates }),
      }
    );
    const data = await response.json();
    return data.routes[0].geometry;
  } catch (error) {
    console.error("Route fetch error:", error);
    return null;
  }
};

export default fetchRoute;

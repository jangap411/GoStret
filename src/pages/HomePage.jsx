import Header from "../components/Header";
import LocationSearch from "../components/LocationSearch";
import MapView from "../components/MapView";
import BottomNav from "../components/BottomNav";
import FloatingButton from "../components/FloatingButton";

const HomePage = () => {
  return (
    <>
      {/* <div className="min-h-screen bg-white flex flex-col"> */}

      {/* Main Content */}
      <div className="flex-1 px-3 pt-4">
        {/* Search Location Inputs */}
        <LocationSearch />

        {/* Map Section */}
        <MapView />
      </div>

      {/* </div> */}
    </>
  );
};

export default HomePage;

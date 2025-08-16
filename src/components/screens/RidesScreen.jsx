import { useState } from "react";
import NoActiveRideNotice from "../NoActiveRideNotice";
import ConfirmRide from "../ConfirmRide";

const RidesScreen = () => {
  const [activeRide, setActiveRide] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* heading */}
      {/* <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Your Rides</h1>
        <p className="text-gray-600 text-sm mt-1">Recent trips and bookings</p>
      </div> */}

      {/* render screen if active exists or not*/}
      {activeRide ? (
        // active ride
        <ConfirmRide />
      ) : (
        //no active ride
        <NoActiveRideNotice />
      )}
    </div>
  );
};

export default RidesScreen;

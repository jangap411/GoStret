import { Car } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/feature/headerSlice";

const NoActiveRideNotice = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex-1 p-4 space-y-4 mb-20">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-900">No active rides</p>
                <p className="text-blue-700 text-sm mr-1">
                  Ready to book your next trip?
                </p>
              </div>
            </div>
            <Link to="/">
              <button
                onClick={() => dispatch(setActiveTab("Book Ride"))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>

        {/* ride history */}
        {/* <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">Recent Rides</h2>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NoActiveRideNotice;

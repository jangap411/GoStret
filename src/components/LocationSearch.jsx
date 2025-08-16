import { Search } from "lucide-react";
import React from "react";

const LocationSearch = () => {
  return (
    <>
      {/* Search Inputs */}
      <div className="space-y-2 mb-2">
        {/* Pickup Location */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center">
          <Search size={16} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter pickup location"
            className="bg-transparent flex-1 text-sm text-gray-900 placeholder-gray-500 outline-none"
          />
        </div>

        {/* Destination */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center">
          <Search size={16} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter destination"
            className="bg-transparent flex-1 text-sm text-gray-900 placeholder-gray-500 outline-none"
          />
        </div>

        {/* Location Search */}
        {/* <div className="bg-white rounded-full p-2.5 flex items-center shadow-sm border border-gray-100"> */}
        <button className="w-full bg-black text-white font-semibold text-sm py-3.5 rounded-lg hover:bg-gray-900 transition-colors">
          Submit
        </button>
        {/* </div> */}
      </div>
    </>
  );
};

export default LocationSearch;

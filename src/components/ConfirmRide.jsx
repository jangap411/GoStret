import { ArrowLeft, MapPin, Car } from "lucide-react";
import { useState } from "react";

const ConfirmRide = () => {
  const [selectedRide, setSelectedRide] = useState("UberX");

  const locations = [
    { title: "Home", subtitle: "123 Main St" },
    { title: "Work", subtitle: "456 Oak Ave" },
  ];

  const rideOptions = [
    { type: "UberX", time: "4 min", price: "K12.34" },
    { type: "UberXL", time: "6 min", price: "K18.51" },
    { type: "Uber Comfort", time: "8 min", price: "K22.78" },
  ];

  return (
    // <div className="min-h-screen bg-gray-100 flex justify-center pt-6 px-4">
    <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg shadow-slate-900/5 flex flex-col">
      {/* Fixed Header */}
      {/* <div className="flex items-center p-4 pb-3 rounded-t-2xl bg-white sticky top-0 z-10">
          <button className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <h1 className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">
            Ride details
          </h1>
        </div> */}

      {/* Scrollable Content */}
      {/* <div className="flex-1 overflow-y-auto px-4 pb-4"> */}
      {/* Locations */}
      <div className="space-y-3.5 mb-4">
        {locations.map((location, index) => (
          <div key={index} className="flex items-start">
            <MapPin
              size={20}
              className="text-gray-600 mt-0.5 mr-3 flex-shrink-0"
            />
            <div>
              <div className="text-gray-900 font-semibold text-sm mb-0.5">
                {location.title}
              </div>
              <div className="text-gray-500 text-xs">{location.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Preview */}
      <div className="mt-4 mb-5">
        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl shadow-sm relative overflow-hidden">
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-40">
            <div className="grid grid-cols-6 h-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border border-green-200/50"></div>
              ))}
            </div>
          </div>

          {/* Map roads */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="20"
              x2="100"
              y2="20"
              stroke="rgba(34,197,94,0.3)"
              strokeWidth="0.8"
            />
            <line
              x1="0"
              y1="35"
              x2="100"
              y2="35"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="1.2"
            />
            <line
              x1="25"
              y1="0"
              x2="25"
              y2="60"
              stroke="rgba(34,197,94,0.3)"
              strokeWidth="0.8"
            />
            <line
              x1="70"
              y1="0"
              x2="70"
              y2="60"
              stroke="rgba(34,197,94,0.3)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
            <path
              d="M20 45 Q40 25 60 30 Q75 35 85 25"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,2"
            />
          </svg>

          {/* Location markers */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          <div className="absolute bottom-6 right-6 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
        </div>
      </div>

      {/* Ride Options */}
      <div>
        <h2 className="text-gray-900 font-semibold text-sm mb-2">
          Ride options
        </h2>

        <div className="space-y-3.5 pb-4">
          {rideOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setSelectedRide(option.type)}
              className={`w-full flex items-center p-0.5 rounded-lg transition-colors ${
                selectedRide === option.type ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <Car size={22} className="text-gray-900" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900 font-medium text-sm">
                  {option.type}
                </div>
                <div className="text-gray-500 text-xs">{option.time}</div>
              </div>
              <div className="text-gray-900 font-medium text-sm">
                {option.price}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* </div> */}

      {/* Fixed Bottom Navigation/Confirm Button */}
      <div className="bg-white p-4 pt-2 rounded-b-2xl sticky bottom-0 border-t border-gray-100">
        <button className="w-full bg-black text-white font-semibold text-sm py-3.5 rounded-lg hover:bg-gray-900 transition-colors">
          Confirm {selectedRide}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default ConfirmRide;

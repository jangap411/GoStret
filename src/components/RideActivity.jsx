import { ChevronRight, Clock, MapPin, Star } from "lucide-react";
import React from "react";

const RideActivity = () => {
  // Sample data for recent rides
  const recentRides = [
    {
      id: 1,
      destination: "Central Mall",
      date: "2 hours ago",
      fare: "PGK12.50",
      driver: "John D.",
      rating: 4.8,
    },
    {
      id: 2,
      destination: "Airport Terminal 2",
      date: "Yesterday",
      fare: "PGK45.00",
      driver: "Sarah M.",
      rating: 5.0,
    },
    {
      id: 3,
      destination: "Downtown Office",
      date: "2 days ago",
      fare: "PGK8.75",
      driver: "Mike R.",
      rating: 4.9,
    },
  ];

  return (
    <>
      {/* <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Your Rides</h1>
      </div> */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-medium text-gray-900">Recent Rides</h2>
          <p className="text-gray-600 text-sm mt-1">
            Recent trips and bookings
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {recentRides.map((ride) => (
            <div
              key={ride.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {ride.destination}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{ride.date}</span>
                      <span>•</span>
                      <span>{ride.driver}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{ride.fare}</p>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RideActivity;

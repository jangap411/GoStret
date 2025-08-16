import { Minus, Plus, Send } from "lucide-react";

const MapView = () => {
  return (
    <div className="relative mt-2 mb-20">
      {/* Map Image */}
      <div className="aspect-square bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg overflow-hidden relative">
        {/* Simulated map with grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-teal-300/50"></div>
            ))}
          </div>
        </div>

        {/* Map road lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="30"
            x2="100"
            y2="30"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.8"
          />
          <line
            x1="0"
            y1="70"
            x2="100"
            y2="70"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.5"
          />
          <line
            x1="30"
            y1="0"
            x2="30"
            y2="100"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.5"
          />
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="100"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white rounded-lg p-2 shadow-md">
          <Plus size={16} className="text-gray-700" />
        </button>
        <button className="bg-white rounded-lg p-2 shadow-md">
          <Minus size={16} className="text-gray-700" />
        </button>
        <button className="bg-white rounded-lg p-2 shadow-md">
          <Send size={16} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default MapView;

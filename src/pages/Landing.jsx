import { Clock, MapPin, Shield } from "lucide-react";
import { Link } from "react-router-dom";
const Landing = () => {
  // login
  const handleLogin = () => {
    console.log("handle login");
    // window.location.href = "/api/login";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
          {/* header */}
          <div className="text-center py-12 px-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              car
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GoStret</h1>
            <p className="text-gray-600">GoSeif</p>
          </div>
          {/* features */}
          <div className="px-6 space-y-4 mb-8">
            <div>
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Easy Booking</h3>
                  <p className="text-sm text-gray-600">
                    Book rides with just a few taps
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Real-time Tracking
                  </h3>
                  <p className="text-sm text-gray-600">
                    Track your driver in real-time
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Safe & Secure</h3>
                  <p className="text-sm text-gray-600">
                    Verified drivers and secure payments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* login button */}
          <div className="px-6 pb-8">
            <Link to="/signin">
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-lg"
              >
                Get Started
              </button>
            </Link>
            <p className="text-center text-sm text-gray-500 mt-4">
              Sign in with Gmail to continue
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

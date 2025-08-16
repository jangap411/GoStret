import { Car, Clock, Home, User, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveTab } from "../store/feature/headerSlice";

const BottomNav = () => {
  const dispatch = useDispatch();

  return (
    // <div className="bg-white border-t border-gray-100 px-4 py-2">
    <div className="flex justify-around items-center">
      <button
        className="flex flex-col items-center py-1"
        onClick={() => dispatch(setActiveTab("Home"))}
      >
        <Link to="/">
          <Home size={20} className="text-black mb-1" />
          <span className="text-xs text-black font-medium">Home</span>
        </Link>
      </button>
      <button
        className="flex flex-col items-center py-1"
        onClick={() => dispatch(setActiveTab("Rides"))}
      >
        <Link to="/rides">
          <Car size={20} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Rides</span>
        </Link>
      </button>
      <button
        className="flex flex-col items-center py-1"
        onClick={() => dispatch(setActiveTab("Wallet"))}
      >
        <Link to="/payments">
          <Wallet size={20} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Wallet</span>
        </Link>
      </button>
      <button
        className="flex flex-col items-center py-1"
        onClick={() => dispatch(setActiveTab("Activity"))}
      >
        <Link to="/activity">
          <Clock size={20} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Activity</span>
        </Link>
      </button>
      <button
        className="flex flex-col items-center py-1"
        onClick={() => dispatch(setActiveTab("Account"))}
      >
        <Link to="/account">
          <User size={20} className="text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Account</span>
        </Link>
      </button>
    </div>
    // </div>
  );
};

export default BottomNav;

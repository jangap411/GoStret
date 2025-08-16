import React from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import HomePage from "./HomePage";
import FloatingButton from "../components/FloatingButton";
import AccountPage from "./AccountPage";
import RidesScreen from "../components/screens/RidesScreen";
import ConfirmRide from "../components/ConfirmRide";
import RideShareApp from "../components/screens/RideShareApp";
import { Outlet } from "react-router-dom";
import RideActivity from "../components/RideActivity";
import Payments from "../components/Payments";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-6 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-lg shadow-slate-900/5 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4 pb-3 rounded-t-2xl bg-white sticky top-0 z-10">
          <Header />
        </div>
        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* pages render */}
          <Outlet />
          {/* Sos button */}
          <FloatingButton />
        </div>
        {/* Fixed bottom navigation */}
        <div className="bg-white p-4 pt-2 rounded-b-2xl sticky bottom-0 border-t border-gray-100">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // or your auth hook

const ProtectedRoute = ({ isLogin }) => {
  // const isLogin = false; //localStorage.getItem("isLogin"); // get login status from localStorage
  console.log(` protected routes isLogin: ${isLogin}`);
  return <>{isLogin ? <Outlet /> : <Navigate to="/signin" />}</>;
};

export default ProtectedRoute;

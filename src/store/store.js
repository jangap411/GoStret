import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import headerTitleSlice from "./feature/headerSlice";
import activeRideSlice from "./feature/activeRideSlice";
import authSlice from "./feature/authSlice"; // Import the auth slice reducer
import locationSlice from "./feature/locationSlice";

// Configure the Redux store with the app slice reducer

export const store = configureStore({
  // This is the main Redux store configuration
  reducer: {
    app: appReducer,
    auth: authSlice,
    headerTitle: headerTitleSlice,
    activeRide: activeRideSlice,
    location: locationSlice,
  },
  // Middleware configuration to handle non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

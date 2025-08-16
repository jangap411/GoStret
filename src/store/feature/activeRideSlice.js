import { createSlice } from "@reduxjs/toolkit";

// Initial state for the app slice
const initialState = {
  activeRide: false,
};

// Create a slice of the Redux store
const activeRideSlice = createSlice({
  name: "activeRide",
  initialState,
  reducers: {
    setActiveRide: (state, action) => {
      state.activeRide = action.payload;
    },
  },
});

export const { setActiveRide } = activeRideSlice.actions;
export default activeRideSlice.reducer;

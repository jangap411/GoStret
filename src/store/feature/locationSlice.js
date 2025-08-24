import { createSlice } from "@reduxjs/toolkit";

// Initial state for the app slice
const initialState = {
  // set default center to vc
  center: { lat: -9.43869006941101, lng: 147.1810054779053 },
  userLocation: null,
  map: null,
};

// Create a slice of the Redux store
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCenter: (state, { payload }) => {
      state.center = payload;
    },
    setUserLocation: (state, { payload }) => {
      state.userLocation = payload;
    },
    setMap: (state, { payload }) => {
      state.map = payload;
    },
  },
});

export const { setCenter, setUserLocation, setMap } = locationSlice.actions;
export default locationSlice.reducer;

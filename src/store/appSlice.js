import { createSlice } from "@reduxjs/toolkit";

// Initial state for the app slice
const initialState = {
  activeTab: "Home",
};

// Create a slice of the Redux store
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    ClearTitle: (state) => {
      state.title = "Home";
    },
  },
});

export const { setActiveTab } = appSlice.actions;
export default appSlice.reducer;

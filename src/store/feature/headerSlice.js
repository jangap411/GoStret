import { createSlice } from "@reduxjs/toolkit";

// Initial state for the app slice
const initialState = {
  activeTab: "Home",
};

// Create a slice of the Redux store
const headerSlice = createSlice({
  name: "headerTitle",
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

export const { setActiveTab } = headerSlice.actions;
export default headerSlice.reducer;

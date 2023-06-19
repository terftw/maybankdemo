import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialMapCenter } from "../constants";

interface MapConfigState {
  center: google.maps.LatLng;
}

const initialState = {
  center: new google.maps.LatLng(initialMapCenter),
} as MapConfigState;

const mapConfigSlice = createSlice({
  name: "mapConfig",
  initialState,
  reducers: {
    recordCurrentCenter(state, action: PayloadAction<google.maps.LatLng>) {
      state.center = action.payload;
    },
  },
});

export const { recordCurrentCenter } = mapConfigSlice.actions;
export default mapConfigSlice;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  googleApiError: google.maps.places.PlacesServiceStatus | null;
}

const initialState = {
  googleApiError: null,
} as ErrorState;

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setGoogleApiError(
      state,
      action: PayloadAction<google.maps.places.PlacesServiceStatus | null>
    ) {
      state.googleApiError = action.payload;
    },
  },
});

export const { setGoogleApiError } = errorSlice.actions;
export default errorSlice;

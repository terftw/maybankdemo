import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GooglePlacesPrediction, googlePlacesStorageKey } from "../constants";
import {
  readCacheData,
  writeAutocompleteSearchEntryToCache,
} from "../helpers/cache";

interface PlacesState {
  cachedPredictions: GooglePlacesPrediction[];
  predictions: google.maps.places.QueryAutocompletePrediction[];
  placeDetails: google.maps.places.PlaceResult | null;
}

const cachedPredictions = readCacheData<GooglePlacesPrediction[]>(
  googlePlacesStorageKey
)?.data;

const initialState = {
  cachedPredictions: cachedPredictions ?? [],
  predictions: [],
  placeDetails: null,
} as PlacesState;

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(
      state,
      action: PayloadAction<google.maps.places.QueryAutocompletePrediction[]>
    ) {
      state.predictions = action.payload;
    },
    setPlaceDetails(
      state,
      action: PayloadAction<google.maps.places.PlaceResult | null>
    ) {
      state.placeDetails = action.payload;
    },
    setCachedPredictions(state, action: PayloadAction<GooglePlacesPrediction>) {
      const newCachedPredictions = writeAutocompleteSearchEntryToCache(
        action.payload
      );

      state.cachedPredictions = newCachedPredictions ?? state.cachedPredictions;
    },
  },
});

export const { setPlaces, setPlaceDetails, setCachedPredictions } =
  placesSlice.actions;
export default placesSlice;

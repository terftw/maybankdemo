import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import placesSlice from "./reducers/places";
import mapConfigSlice from "./reducers/mapConfig";
import errorSlice from "./reducers/error";

export const store = configureStore({
  reducer: {
    [placesSlice.name]: placesSlice.reducer,
    [mapConfigSlice.name]: mapConfigSlice.reducer,
    [errorSlice.name]: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

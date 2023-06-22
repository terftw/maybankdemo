type GooglePlacesPrediction = {
  description: string;
  placeId: string;
};

type GetPlaceDetailsReturnTypePhotos = {
  height: string;
  html_attributions: string[];
  photo_reference: string;
  width: string;
};

type GetPlaceDetailsResult = Omit<google.maps.places.PlaceResult, "photos"> & {
  photos: GetPlaceDetailsReturnTypePhotos[];
};

type Nullable<T> = undefined | null | T;

const initialMapCenter = {
  lat: 1.2857866,
  lng: 103.8500235,
};

const googlePlacesStorageKey = "googlePlaces" as const;
const MAX_SEARCH_HISTORY_RESULT = 3 as const;

export { initialMapCenter, googlePlacesStorageKey, MAX_SEARCH_HISTORY_RESULT };
export type { GooglePlacesPrediction, GetPlaceDetailsResult, Nullable };

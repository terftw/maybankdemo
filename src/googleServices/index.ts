import { setGoogleApiError } from "../reducers/error";
import { setPlaces, setPlaceDetails } from "../reducers/places";
import { AppDispatch } from "../store";

const autocompleteService = new google.maps.places.AutocompleteService();
const placesService = new google.maps.places.PlacesService(
  document.createElement("div")
);

const fetchPredictionsFromGooglePlaces =
  (dispatch: AppDispatch) => (value: string, location: google.maps.LatLng) => {
    autocompleteService.getQueryPredictions(
      {
        input: value,
        radius: 300,
        location,
      },
      (prediction, status) => {
        status === google.maps.places.PlacesServiceStatus.OK
          ? dispatch(setPlaces(prediction ?? []))
          : dispatch(setGoogleApiError(status));
      }
    );
  };

const fetchPlaceFromGooglePlaces =
  (dispatch: AppDispatch) => (selectedPlaceId: string) => {
    selectedPlaceId &&
      placesService.getDetails(
        {
          placeId: selectedPlaceId,
          fields: [
            "geometry",
            "formatted_address",
            "name",
            "rating",
            "website",
            "opening_hours",
            "formatted_phone_number",
            "reviews",
            "photos",
          ],
        },
        function callback(place, status) {
          status === google.maps.places.PlacesServiceStatus.OK
            ? dispatch(setPlaceDetails(place))
            : dispatch(setGoogleApiError(status));
        }
      );
  };

export { fetchPlaceFromGooglePlaces, fetchPredictionsFromGooglePlaces };

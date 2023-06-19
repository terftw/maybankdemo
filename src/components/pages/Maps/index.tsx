import MapsTemplate from "../../templates/Maps";
import {
  fetchPlaceFromGooglePlaces,
  fetchPredictionsFromGooglePlaces,
} from "../../../googleServices";
import { useAppDispatch } from "../../../store";

const MapsPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const fetchPrediction = fetchPredictionsFromGooglePlaces(dispatch);
  const fetchPlaceFromPlaceId = fetchPlaceFromGooglePlaces(dispatch);

  return (
    <MapsTemplate
      fetchPrediction={fetchPrediction}
      fetchPlaceFromPlaceId={fetchPlaceFromPlaceId}
    />
  );
};

export default MapsPage;

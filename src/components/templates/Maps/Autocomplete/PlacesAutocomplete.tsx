import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import type { SelectProps } from "antd/es/select";
import type { GooglePlacesPrediction } from "../../../../constants";
import debounce from "lodash/debounce";
import { RootState, useAppDispatch } from "../../../../store";
import { useSelector } from "react-redux";
import { isArrayNonEmptyAndDefined } from "../../../../helpers";
import { setCachedPredictions } from "../../../../reducers/places";

type Props = {
  fetchPrediction: (value: string, location: google.maps.LatLng) => void;
  fetchPlaceFromPlaceId: (placeId: string) => void;
};

const createOptions = (value: GooglePlacesPrediction[], category: string) =>
  value.map(({ description, placeId }) => {
    return {
      value: description,
      key: `${placeId}-${category}`,
      label: (
        <div
          key={`${placeId}-${category}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{description}</span>
        </div>
      ),
    };
  });

const PlacesAutoComplete = ({
  fetchPrediction,
  fetchPlaceFromPlaceId,
}: Props): React.ReactElement => {
  const [options, setOptions] = useState<
    SelectProps<GooglePlacesPrediction>["options"]
  >([]);
  const { predictions, cachedPredictions } = useSelector(
    (state: RootState) => state.places
  );
  const { center } = useSelector((state: RootState) => state.mapConfig);
  const dispatch = useAppDispatch();

  useEffect(
    function convertResultsIntoOptions() {
      let fetchedPredictions: GooglePlacesPrediction[] = [];
      if (predictions) {
        fetchedPredictions = predictions.map(({ description, place_id }) => {
          return { description, placeId: place_id ?? "" };
        });
      }

      const combinedOptions = [
        ...(isArrayNonEmptyAndDefined(fetchedPredictions)
          ? [
              {
                label: <span>Current results</span>,
                options: createOptions(fetchedPredictions, "current"),
              },
            ]
          : []),
        ...(isArrayNonEmptyAndDefined(cachedPredictions)
          ? [
              {
                label: <span>Recent searches</span>,
                options: createOptions(
                  [...cachedPredictions].reverse(),
                  "cache"
                ),
              },
            ]
          : []),
      ];

      setOptions(combinedOptions);
    },
    [predictions, cachedPredictions]
  );

  const handleSearch = (value: string) => {
    value && fetchPrediction(value, center);
  };

  const onSelect = async (value: string) => {
    const placeIdFromPredictions = predictions.find(
      ({ description }) => description === value
    )?.place_id;

    const placeIdFromCachedPredictions = cachedPredictions.find(
      ({ description }) => description === value
    )?.placeId;

    if (placeIdFromCachedPredictions) {
      fetchPlaceFromPlaceId(placeIdFromCachedPredictions);
    } else if (placeIdFromPredictions) {
      dispatch(
        setCachedPredictions({
          description: value,
          placeId: placeIdFromPredictions,
        })
      );
      fetchPlaceFromPlaceId(placeIdFromPredictions);
    }
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{ width: 400 }}
      options={options}
      onSearch={debounce(handleSearch, 300)}
      onSelect={onSelect}
    >
      <Input.Search size="large" placeholder="Search Map" enterButton />
    </AutoComplete>
  );
};

export type { Props };
export { PlacesAutoComplete };

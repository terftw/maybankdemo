import { Layout, Button } from "antd";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { PlacesAutoComplete } from "./Autocomplete/PlacesAutocomplete";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import PlaceDetailsDrawer from "./PlaceDetails";
import { initialMapCenter } from "../../../constants";
import type { Props as AutocompleteProps } from "./Autocomplete/PlacesAutocomplete";
import { recordCurrentCenter } from "../../../reducers/mapConfig";
import ErrorAlert from "../../atoms/ErrorAlert";

type Props = {
  fetchPrediction: AutocompleteProps["fetchPrediction"];
  fetchPlaceFromPlaceId: AutocompleteProps["fetchPlaceFromPlaceId"];
};

const { Content } = Layout;

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const MapsTemplate = ({
  fetchPrediction,
  fetchPlaceFromPlaceId,
}: Props): React.ReactElement => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { placeDetails } = useSelector((state: RootState) => state.places);
  const { googleApiError } = useSelector((state: RootState) => state.error);
  const dispatch = useAppDispatch();

  const { geometry } = placeDetails ?? {};
  const latLngFromSearchedPlace =
    geometry && geometry.location ? geometry.location : undefined;

  useEffect(
    function openDrawerOnNewPlace() {
      if (latLngFromSearchedPlace) {
        setOpenDrawer(true);
      }
    },
    [latLngFromSearchedPlace]
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(initialMapCenter);
    map.fitBounds(bounds);
    setMapRef(map);
  }, []);

  const onCenterChanged = useCallback(() => {
    if (mapRef) {
      const center = mapRef.getCenter();
      center &&
        dispatch(
          recordCurrentCenter(
            new google.maps.LatLng(center.lat(), center.lng())
          )
        );
    }
  }, [mapRef, dispatch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <GoogleMap
          id="map"
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: true,
            minZoom: 4,
            maxZoom: 18,
          }}
          mapContainerStyle={containerStyle}
          center={
            latLngFromSearchedPlace ? latLngFromSearchedPlace : initialMapCenter
          }
          zoom={12}
          onLoad={onLoad}
          onCenterChanged={onCenterChanged}
        >
          {googleApiError && <ErrorAlert error={googleApiError} />}
          {/* Child components, such as markers, info windows, etc. */}
          <div
            style={{
              display: "flex",
              height: "10vh",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0 32px",
            }}
          >
            <PlacesAutoComplete
              fetchPrediction={fetchPrediction}
              fetchPlaceFromPlaceId={fetchPlaceFromPlaceId}
            />
            {latLngFromSearchedPlace && !openDrawer && (
              <Button
                size="large"
                type="primary"
                onClick={() => setOpenDrawer(true)}
              >
                Open place details
              </Button>
            )}
          </div>
          {geometry && geometry.location && (
            <Marker position={geometry.location} />
          )}
          <PlaceDetailsDrawer
            drawerConfigurations={{
              shouldOpen: openDrawer,
              setShouldOpen: setOpenDrawer,
            }}
          />
        </GoogleMap>
      </Content>
    </Layout>
  );
};

export default MapsTemplate;

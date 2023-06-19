import { Alert } from "antd";

type Props = {
  error: google.maps.places.PlacesServiceStatus;
};

const errorMesssage = (error: google.maps.places.PlacesServiceStatus) => {
  switch (error) {
    case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
      return "The request was not valid";
    case google.maps.places.PlacesServiceStatus.NOT_FOUND:
      return "The place is not found";
    case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
      return "The Google Places API quota limit has exceeded";
    case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
      return "The request has been denied";
    case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
      return "No results are found for this request";
    case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
    default:
      return "An unexpected error has occurred, check your network connection";
  }
};

const ErrorAlert = ({ error }: Props): React.ReactElement => {
  return (
    <Alert
      style={{ position: "fixed", width: "100%" }}
      message={errorMesssage(error)}
      banner
      closable
    />
  );
};

export default ErrorAlert;

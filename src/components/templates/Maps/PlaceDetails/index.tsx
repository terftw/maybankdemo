import { Drawer, Image, Typography, Divider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ReviewCard from "./ReviewCard";
import NameAndRating from "./NameAndRating";
import PlaceDetailsInfo from "./PlaceDetailsInfo";

const { Title, Text } = Typography;

type Props = {
  drawerConfigurations: {
    shouldOpen: boolean;
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const PlaceDetailsDrawer = ({
  drawerConfigurations: { shouldOpen, setShouldOpen },
}: Props): React.ReactElement => {
  const { placeDetails } = useSelector((state: RootState) => state.places);
  const {
    formatted_address,
    name,
    rating,
    website,
    opening_hours,
    formatted_phone_number,
    reviews,
    photos,
  } = placeDetails ?? {};

  return (
    <Drawer
      title="Location details"
      placement="right"
      open={shouldOpen}
      mask={false}
      onClose={() => setShouldOpen(false)}
      bodyStyle={{ padding: 0 }}
      width={450}
    >
      <Image src={photos?.[0].getUrl()} preview={false} width="100%" />

      <div style={{ padding: "0 24px" }}>
        <NameAndRating name={name} rating={rating} />
        <Divider />
        <PlaceDetailsInfo
          openingHours={opening_hours}
          formattedAddress={formatted_address}
          website={website}
          formattedPhoneNumber={formatted_phone_number}
        />
        <Divider />
        {reviews && <Title level={5}>Reviews</Title>}
        {reviews?.map((review, idx) => (
          <div key={idx}>
            <ReviewCard review={review} />
            {idx !== reviews.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default PlaceDetailsDrawer;

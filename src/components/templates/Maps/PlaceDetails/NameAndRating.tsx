import { Rate, Typography } from "antd";

const { Title, Text } = Typography;

type Props = {
  name?: string;
  rating?: number;
};

const NameAndRating = ({ name, rating }: Props): React.ReactElement => {
  return (
    <>
      <Title level={3}>{name}</Title>
      {rating && (
        <div style={{ display: "flex" }}>
          <Text
            style={{ fontSize: 18, marginRight: 8 }}
          >{`Rating: ${rating}`}</Text>
          <Rate allowHalf value={rating} style={{ fontSize: 18 }} disabled />
        </div>
      )}
    </>
  );
};

export default NameAndRating;

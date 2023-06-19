import { Avatar, Col, Row, Tooltip, Typography, Rate } from "antd";

const { Text, Link, Paragraph } = Typography;

type Props = {
  review: google.maps.places.PlaceReview;
};

const ReviewCard = ({
  review: {
    author_name,
    author_url,
    profile_photo_url,
    rating,
    relative_time_description,
    text,
  },
}: Props): React.ReactElement => {
  return (
    <Row gutter={[16, 8]} align="middle" key={author_url}>
      {profile_photo_url && (
        <Col span={3}>
          <Avatar
            size="large"
            src={profile_photo_url}
            onError={() => {
              return false;
            }}
          />
        </Col>
      )}
      <Col span={21}>
        <Tooltip placement="right" title="View reviewer's profile">
          <Text underline>
            <Link href={author_url} target="_blank" style={{ color: "black" }}>
              {author_name}
            </Link>
          </Text>
        </Tooltip>
      </Col>
      <Col span={9}>
        <Rate allowHalf value={rating} style={{ fontSize: 18 }} disabled />
      </Col>
      <Col span={13}>
        <Text style={{ fontSize: 16 }}>{relative_time_description}</Text>
      </Col>
      <Col span={24}>
        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
          {text}
        </Paragraph>
      </Col>
    </Row>
  );
};

export default ReviewCard;

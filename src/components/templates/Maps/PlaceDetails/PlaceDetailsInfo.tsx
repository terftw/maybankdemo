import {
  PushpinOutlined,
  GlobalOutlined,
  FieldTimeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Collapse, CollapseProps, Row, Typography } from "antd";

const { Text } = Typography;

type Props = {
  openingHours?: google.maps.places.PlaceOpeningHours;
  formattedAddress?: string;
  formattedPhoneNumber?: string;
  website?: string;
};

const PlaceDetailsInfo = ({
  openingHours,
  formattedAddress,
  formattedPhoneNumber,
  website,
}: Props): React.ReactElement => {
  const { open_now, weekday_text } = openingHours ?? {};
  const items: CollapseProps["items"] = [
    {
      key: "weekday_text",
      label: "Opening hours",
      children: (
        <>
          {weekday_text?.map((text, idx) => (
            <div key={idx}>
              <Text>{text}</Text>
            </div>
          ))}
        </>
      ),
    },
  ];

  const openingHoursTextType = openingHours
    ? open_now
      ? "success"
      : "danger"
    : undefined;
  const openingHoursText = openingHours
    ? open_now
      ? "Open"
      : "Closed"
    : "No opening hours given";

  return (
    <>
      <Row gutter={[16, 24]} align="middle">
        <Col span={2}>
          <PushpinOutlined style={{ fontSize: 16 }} />
        </Col>
        <Col span={22}>
          <Text style={{ fontSize: 16 }} ellipsis copyable>
            {formattedAddress}
          </Text>
        </Col>
        <Col span={2}>
          <PhoneOutlined style={{ fontSize: 16 }} />
        </Col>
        <Col span={22}>
          <Text
            style={{ fontSize: 16 }}
            ellipsis
            copyable={Boolean(formattedPhoneNumber)}
          >
            {formattedPhoneNumber ?? "No phone number available"}
          </Text>
        </Col>
        <Col span={2}>
          <GlobalOutlined style={{ fontSize: 16 }} />
        </Col>
        <Col span={22}>
          <Text style={{ fontSize: 16 }} ellipsis copyable={Boolean(website)}>
            {website ?? "No website available"}
          </Text>
        </Col>
        <Col span={2}>
          <FieldTimeOutlined style={{ fontSize: 16 }} />
        </Col>
        <Col span={22}>
          <Text style={{ fontSize: 16 }} type={openingHoursTextType}>
            {openingHoursText}
          </Text>
        </Col>
      </Row>
      {openingHours && <Collapse ghost items={items} />}
    </>
  );
};

export default PlaceDetailsInfo;

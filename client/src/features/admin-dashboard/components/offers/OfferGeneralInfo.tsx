import { Typography, Row, Col } from "antd";

interface IOfferGeneralInfoProps {
  departament: string;
  availablePos: number;
  remainingAvailablePos: number;
  description: string;
  requirements: string;
  mentions: string;
}

const OfferGeneralInfo = ({
  departament,
  availablePos,
  remainingAvailablePos,
  description,
  requirements,
  mentions,
}: IOfferGeneralInfoProps) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Title level={4}>Departament</Typography.Title>
          <Typography.Paragraph>{departament}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>Offered Positions</Typography.Title>
          <Typography.Paragraph>{availablePos}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>Available Positions</Typography.Title>
          <Typography.Paragraph>{remainingAvailablePos}</Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>Job Description</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
      <Typography.Title level={4}>Job Requirements</Typography.Title>
      <Typography.Paragraph>{requirements}</Typography.Paragraph>
      <Typography.Title level={4}>Mentions</Typography.Title>
      <Typography.Paragraph>{mentions}</Typography.Paragraph>
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Supervisor</Typography.Title>
          <Typography.Title level={4}>Name</Typography.Title>
          <Typography.Paragraph>Niculiță Gheorghe</Typography.Paragraph>
          <Typography.Title level={4}>Email</Typography.Title>
          <Typography.Paragraph>Alf29@LangKoepp.ac.com</Typography.Paragraph>
          <Typography.Title level={4}>Job Title</Typography.Title>
          <Typography.Paragraph>
            Senior Identity Coordinator
          </Typography.Paragraph>
          <Typography.Title level={4}>Phone Number</Typography.Title>
          <Typography.Paragraph>{`+40738360009`}</Typography.Paragraph>
        </Col>
      </Row> */}
    </>
  );
};

export default OfferGeneralInfo;

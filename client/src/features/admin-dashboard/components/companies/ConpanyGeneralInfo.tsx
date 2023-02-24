import { Typography, Row, Col } from "antd";

interface ICompanyGeneralInfoData {
  address: string;
  fieldOfWork: string;
  contactNumber: string;
  description: string;
}

const ConpanyGeneralInfo = ({
  address,
  fieldOfWork,
  contactNumber,
  description,
}: ICompanyGeneralInfoData) => {
  let fow = "";
  switch (fieldOfWork) {
    case "telecom":
      fow = "Telecom";
      break;
    case "softwareDev":
      fow = "Software Developement";
      break;
    case "electronics":
      fow = "Electronics";
      break;
    case "other":
      fow = "Other";
      break;
    default:
      break;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Address</Typography.Title>
          <Typography.Paragraph>{address}</Typography.Paragraph>
          <Typography.Title level={4}>Phone Number</Typography.Title>
          <Typography.Paragraph>{`+40${contactNumber}`}</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Field of work</Typography.Title>
          <Typography.Paragraph>{fow}</Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>Company Description</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </>
  );
};

export default ConpanyGeneralInfo;

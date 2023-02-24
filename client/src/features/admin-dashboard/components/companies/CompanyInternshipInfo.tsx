import { Typography, Row, Col } from "antd";

interface IInternshipInfoProps {
  internshipMainAddress: string;
  internshipOtherAddresses: string;
  internshipOtherAdvantages: string;
  internshipCompensation: boolean;
  internshipContract: boolean;
}

const CompanyInternshipInfo: React.FC<IInternshipInfoProps> = ({
  internshipMainAddress,
  internshipOtherAddresses,
  internshipOtherAdvantages,
  internshipCompensation,
  internshipContract,
}) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Main Address</Typography.Title>
          <Typography.Paragraph>{internshipMainAddress}</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Other Addresses</Typography.Title>
          <Typography.Paragraph>
            {internshipOtherAddresses}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Contract Offered</Typography.Title>
          <Typography.Paragraph>
            {internshipContract ? "Yes" : "No"}
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Compensation Offered</Typography.Title>
          <Typography.Paragraph>
            {internshipCompensation ? "Yes" : "No"}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>Advantages</Typography.Title>
      <Typography.Paragraph>
        {internshipOtherAdvantages || "-"}
      </Typography.Paragraph>
    </>
  );
};

export default CompanyInternshipInfo;

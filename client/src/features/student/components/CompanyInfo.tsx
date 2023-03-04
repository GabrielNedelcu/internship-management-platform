import { ICompanyData } from "common/types";
import { Row, Col, Typography } from "antd";
import { Card } from "common";

interface ICompanyInfoProps {
  companyData: ICompanyData;
}

const CompanyInfo = ({ companyData }: ICompanyInfoProps) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title="Offers"
            content={
              <Typography.Paragraph>
                <br />
                {companyData.numOffers}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={6}>
          <Card
            title="Positions"
            content={
              <Typography.Paragraph>
                <br />
                {companyData.numPositions}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={6}>
          <Card
            title="Offers Contract"
            content={
              <Typography.Paragraph>
                <br />
                {companyData.internshipContract ? "yes" : "no"}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={6}>
          <Card
            title="Offers Compensation"
            content={
              <Typography.Paragraph>
                <br />
                {companyData.internshipCompensation ? "yes" : "no"}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="About the company"
            content={
              <Typography.Paragraph>
                <br />
                {companyData.description}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default CompanyInfo;

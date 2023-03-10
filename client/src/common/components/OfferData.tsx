import { Row, Col, Typography, Descriptions } from "antd";
import { Card } from "common";
import { IOfferData } from "common/types";

interface IOfferDataProps {
  offerData: IOfferData;
  companyView: boolean;
}

const OfferData = ({ offerData, companyView }: IOfferDataProps) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {companyView && (
          <Col span={24}>
            <Card
              title="Supervisor"
              content={
                <>
                  <br />
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label="Name" span={0.5}>
                      {offerData.supervisor?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={1}>
                      {offerData.supervisor?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Number" span={0.5}>
                      +40{offerData.supervisor?.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Job Title" span={1}>
                      {offerData.supervisor?.jobTitle}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              }
            />
          </Col>
        )}
        <Col span={24}>
          <Card
            title="Job description"
            content={
              <Typography.Paragraph>
                <br />
                {offerData.description}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Job requirements"
            content={
              <Typography.Paragraph>
                <br />
                {offerData.requirements}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Other mentions"
            content={
              <Typography.Paragraph>
                <br />
                {offerData.mentions}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default OfferData;

import { Row, Col, Typography, Descriptions } from "antd";
import { Card } from "common";
import { IOfferData } from "common/types";
import { useTranslation } from "react-i18next";

interface IOfferDataProps {
  offerData: IOfferData;
  companyView: boolean;
}

const OfferData = ({ offerData, companyView }: IOfferDataProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        {companyView && (
          <Col span={24}>
            <Card
              title={t("SUPERVISOR")}
              content={
                <>
                  <br />
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label={t("NAME")} span={0.5}>
                      {offerData.supervisor?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("EMAIL")} span={1}>
                      {offerData.supervisor?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("PHONE_NUMBER")} span={0.5}>
                      +40{offerData.supervisor?.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("JOB_TITLE")} span={1}>
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
            title={t("JOB_DESCRIPTION")}
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
            title={t("JOB_REQUIREMENTS")}
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
            title={t("OTHER_MENTIONS")}
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

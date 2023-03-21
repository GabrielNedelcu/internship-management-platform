import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

import { IOfferData } from "common/types";

interface IOfferOverviewProps {
  offerData: IOfferData;
}

const OfferOverview = ({ offerData }: IOfferOverviewProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Title level={4}>{t("DEPARTAMENT")}</Typography.Title>
          <Typography.Paragraph>{offerData.departament}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>
            {t("OFFERED_POSITIONS")}
          </Typography.Title>
          <Typography.Paragraph>{offerData.availablePos}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>
            {t("AVAILABLE_POSITIONS")}
          </Typography.Title>
          <Typography.Paragraph>
            {offerData.remainingAvailablePos}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("JOB_DESCRIPTION")}</Typography.Title>
      <Typography.Paragraph>{offerData.description}</Typography.Paragraph>
      <Typography.Title level={4}>{t("JOB_REQUIREMENTS")}</Typography.Title>
      <Typography.Paragraph>{offerData.requirements}</Typography.Paragraph>
      <Typography.Title level={4}>{t("OTHER_MENTIONS")}</Typography.Title>
      <Typography.Paragraph>{offerData.mentions}</Typography.Paragraph>
    </>
  );
};

export default OfferOverview;

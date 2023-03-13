import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Typography.Title level={4}>{t("DEPARTAMENT")}</Typography.Title>
          <Typography.Paragraph>{departament}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>
            {t("OFFERED_POSITIONS")}
          </Typography.Title>
          <Typography.Paragraph>{availablePos}</Typography.Paragraph>
        </Col>
        <Col span={8}>
          <Typography.Title level={4}>
            {t("AVAILABLE_POSITIONS")}
          </Typography.Title>
          <Typography.Paragraph>{remainingAvailablePos}</Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("JOB_DESCRIPTION")}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
      <Typography.Title level={4}>{t("JOB_REQUIREMENTS")}</Typography.Title>
      <Typography.Paragraph>{requirements}</Typography.Paragraph>
      <Typography.Title level={4}>{t("OTHER_MENTIONS")}</Typography.Title>
      <Typography.Paragraph>{mentions}</Typography.Paragraph>
    </>
  );
};

export default OfferGeneralInfo;

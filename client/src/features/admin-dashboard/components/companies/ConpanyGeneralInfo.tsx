import { Typography, Row, Col } from "antd";
import { getFieldOfWork } from "common/utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("ADDRESS")}</Typography.Title>
          <Typography.Paragraph>{address}</Typography.Paragraph>
          <Typography.Title level={4}>{t("PHONE_NUMBER")}</Typography.Title>
          <Typography.Paragraph>{`+40${contactNumber}`}</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{t("FIELD_OF_WORK")}</Typography.Title>
          <Typography.Paragraph>
            {getFieldOfWork(fieldOfWork)}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("COMPANY_DESCRIPTION")}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </>
  );
};

export default ConpanyGeneralInfo;

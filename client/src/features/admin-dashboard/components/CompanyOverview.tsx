import { Typography, Row, Col } from "antd";
import { ICompanyData } from "common/types";
import { getFieldOfWork } from "common/utils";
import { useTranslation } from "react-i18next";

interface ICompanyOverviewProps {
  companyData: ICompanyData;
}

const CompanyOverview = ({ companyData }: ICompanyOverviewProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("ADDRESS")}</Typography.Title>
          <Typography.Paragraph>{companyData.address}</Typography.Paragraph>
          <Typography.Title level={4}>{t("PHONE_NUMBER")}</Typography.Title>
          <Typography.Paragraph>{`+40${companyData.contactNumber}`}</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{t("FIELD_OF_WORK")}</Typography.Title>
          <Typography.Paragraph>
            {getFieldOfWork(companyData.fieldOfWork || "")}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("COMPANY_DESCRIPTION")}</Typography.Title>
      <Typography.Paragraph>{companyData.description}</Typography.Paragraph>
    </>
  );
};

export default CompanyOverview;

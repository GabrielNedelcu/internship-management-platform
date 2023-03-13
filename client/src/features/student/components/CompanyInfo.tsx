import { ICompanyData } from "common/types";
import { Row, Col, Typography } from "antd";
import { Card } from "common";
import { useTranslation } from "react-i18next";

interface ICompanyInfoProps {
  companyData: ICompanyData;
}

const CompanyInfo = ({ companyData }: ICompanyInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title={t("OFFERS")}
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
            title={t("POSITIONS")}
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
            title={t("CONTRACT_OFFERED")}
            content={
              <Typography.Paragraph>
                <br />
                {companyData.internshipContract ? t("YES") : t("NO")}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={6}>
          <Card
            title={t("COMPENSATION_OFFERED")}
            content={
              <Typography.Paragraph>
                <br />
                {companyData.internshipCompensation ? t("YES") : t("NO")}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title={t("COMPANY_DESCRIPTION")}
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

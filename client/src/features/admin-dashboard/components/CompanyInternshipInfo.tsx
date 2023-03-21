import { Typography, Row, Col } from "antd";
import { ICompanyData } from "common/types";
import { useTranslation } from "react-i18next";

interface ICompanyInternshipInfoProps {
  companyData: ICompanyData;
}

const CompanyInternshipInfo = ({
  companyData,
}: ICompanyInternshipInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("MAIN_ADDRESS")}</Typography.Title>
          <Typography.Paragraph>
            {companyData.internshipMainAddress}
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{t("OTHER_ADDRESSES")}</Typography.Title>
          <Typography.Paragraph>
            {companyData.internshipOtherAddresses}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("CONTRACT_OFFERED")}</Typography.Title>
          <Typography.Paragraph>
            {companyData.internshipContract ? t("YES") : t("NO")}
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            {t("COMPENSATION_OFFERED")}
          </Typography.Title>
          <Typography.Paragraph>
            {companyData.internshipCompensation ? t("YES") : t("NO")}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("ADVANTAGES")}</Typography.Title>
      <Typography.Paragraph>
        {companyData.internshipOtherAdvantages || "-"}
      </Typography.Paragraph>
    </>
  );
};

export default CompanyInternshipInfo;

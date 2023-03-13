import { Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("MAIN_ADDRESS")}</Typography.Title>
          <Typography.Paragraph>{internshipMainAddress}</Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{t("OTHER_ADDRESSES")}</Typography.Title>
          <Typography.Paragraph>
            {internshipOtherAddresses}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("CONTRACT_OFFERED")}</Typography.Title>
          <Typography.Paragraph>
            {internshipContract ? t("YES") : t("NO")}
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            {t("COMPENSATION_OFFERED")}
          </Typography.Title>
          <Typography.Paragraph>
            {internshipCompensation ? t("YES") : t("NO")}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("ADVANTAGES")}</Typography.Title>
      <Typography.Paragraph>
        {internshipOtherAdvantages || "-"}
      </Typography.Paragraph>
    </>
  );
};

export default CompanyInternshipInfo;

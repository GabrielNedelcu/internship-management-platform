import { Col, Descriptions, Row, Typography } from "antd";
import { Card, LoadingPage } from "common";
import { useTranslation } from "react-i18next";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const { t } = useTranslation();

  const { companyProfileData, isLoading } = useProfile();
  if (!companyProfileData || isLoading)
    return <LoadingPage message={t("FETCHING_PROFILE_DATA")} />;

  return (
    <>
      <Typography.Title level={1}>{t("YOUR_PROFILE")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("YOUR_PROFILE_MSG")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={t("CONTACT_INFORMATION")}
            content={
              <>
                <br />
                <Descriptions layout="vertical">
                  <Descriptions.Item label={t("EMAIL")}>
                    {companyProfileData.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("PHONE_NUMBER")}>
                    +40{companyProfileData.contactNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("ADDRESS")}>
                    {companyProfileData.address}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={12}>
          <Card
            title={t("LEGAL_REP")}
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label={t("NAME")} span={3}>
                    {companyProfileData.legalRep?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("EMAIL")} span={3}>
                    {companyProfileData.legalRep?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("PHONE_NUMBER")} span={3}>
                    +40{companyProfileData.legalRep?.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("JOB_TITLE")} span={3}>
                    {companyProfileData.legalRep?.jobTitle}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={12}>
          <Card
            title={t("INTERNSHIP_HANDLER")}
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label={t("NAME")} span={3}>
                    {companyProfileData.handler?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("EMAIL")} span={3}>
                    {companyProfileData.handler?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("PHONE_NUMBER")} span={3}>
                    +40{companyProfileData.handler?.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("JOB_TITLE")} span={3}>
                    {companyProfileData.handler?.jobTitle}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title={t("INTERNSHIP_OPTIONS")}
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label={t("MAIN_ADDRESS")} span={3}>
                    {companyProfileData.internshipMainAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("OTHER_ADDRESSES")} span={3}>
                    {companyProfileData.internshipOtherAddresses}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("CONTRACT_OFFERED")} span={1}>
                    {companyProfileData.internshipContract ? t("YES") : t("NO")}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("COMPENSATION_OFFERED")} span={1}>
                    {companyProfileData.internshipCompensation
                      ? t("YES")
                      : t("NO")}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("OFFERS")} span={0.5}>
                    {companyProfileData.numOffers}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("POSITIONS")} span={0.5}>
                    {companyProfileData.numPositions}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("ADVANTAGES")} span={3}>
                    {companyProfileData.internshipOtherAdvantages || "-"}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title={t("COMPANY_DESCRIPTION")}
            content={
              <Typography.Paragraph>
                <br />
                {companyProfileData.description}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default Profile;

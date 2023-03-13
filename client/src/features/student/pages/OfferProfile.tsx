import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button } from "antd";
import { LoadingPage, Card, OfferData } from "common";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";

const OfferProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const offerId = params.offerID;
  const { offerData, isLoading, handleApply, handleRemoveApplication } =
    useOfferProfile(offerId || "");

  if (!offerData || isLoading)
    return <LoadingPage message={t("FETCHING_OFFER_DATA")} />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Typography.Title level={1}>{offerData.title}</Typography.Title>
          <Typography.Title level={5} type={"secondary"}>
            {offerData.companyName} | {offerData.departament}
          </Typography.Title>
        </Col>

        <Col span={6}>
          {offerData.application ? (
            <Button
              size="large"
              icon={<SendOutlined />}
              onClick={handleRemoveApplication}
              block
              danger
            >
              {t("REMOVE_APPLICATION")}
            </Button>
          ) : (
            <Button
              size="large"
              icon={<SendOutlined />}
              onClick={handleApply}
              block
            >
              {t("APPLY_TO_OFFER")}
            </Button>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title={t("OFFERED_POSITIONS")}
            content={
              <Typography.Paragraph>
                <br />
                {offerData.availablePos}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={8}>
          <Card
            title={t("AVAILABLE_POSITIONS")}
            content={
              <Typography.Paragraph>
                <br />
                {offerData.remainingAvailablePos}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={8}>
          <Card
            title={t("APPLICATIONS")}
            content={
              <Typography.Paragraph>
                <br />
                {offerData.applications}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>

      <OfferData offerData={offerData} companyView={false} />
    </>
  );
};

export default OfferProfile;

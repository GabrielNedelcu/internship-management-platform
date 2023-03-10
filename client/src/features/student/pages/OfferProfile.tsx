import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button } from "antd";
import { LoadingPage, Card, OfferData } from "common";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";

const OfferProfile = () => {
  const params = useParams();
  const offerId = params.offerID;
  const { offerData, isLoading, handleApply, handleRemoveApplication } =
    useOfferProfile(offerId || "");

  if (!offerData || isLoading)
    return <LoadingPage message="Fetching offer data ..." />;

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
              Remove Application
            </Button>
          ) : (
            <Button
              size="large"
              icon={<SendOutlined />}
              onClick={handleApply}
              block
            >
              Apply to this offer
            </Button>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title="Positions Offered"
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
            title="Positions Available"
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
            title="Applications"
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

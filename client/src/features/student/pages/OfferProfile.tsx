import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Button } from "antd";
import { LoadingPage, Card } from "common";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";

const OfferProfile = () => {
  const params = useParams();
  const offerId = params.offerID;
  const { data, loading, handleApply, handleRemoveApplication } =
    useOfferProfile(offerId || "");

  if (!data || loading)
    return <LoadingPage message="Fetching offer data ..." />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Typography.Title level={1}>{data.title}</Typography.Title>
          <Typography.Title level={5} type={"secondary"}>
            {data.companyName} | {data.departament}
          </Typography.Title>
        </Col>

        <Col span={6}>
          {data.application ? (
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
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.availablePos}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={8}>
          <Card
            title="Positions Available"
            content={
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.remainingAvailablePos}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={8}>
          <Card
            title="Applications"
            content={
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.applications}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Job description"
            content={
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.description}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Job requirements"
            content={
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.requirements}
              </Typography.Paragraph>
            }
          />
        </Col>
        <Col span={24}>
          <Card
            title="Other mentions"
            content={
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <br />
                {data.mentions}
              </Typography.Paragraph>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default OfferProfile;

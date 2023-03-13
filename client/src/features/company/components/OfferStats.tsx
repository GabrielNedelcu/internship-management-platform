import { Row, Col, Typography } from "antd";
import { Card, LoadingPage } from "common";
import { useTranslation } from "react-i18next";
import useOfferStats from "../hooks/useOfferStats";

interface IOfferStatsProps {
  offerId: string;
}

const OfferStats = ({ offerId }: IOfferStatsProps) => {
  const { t } = useTranslation();

  const { offerStats, isLoading } = useOfferStats(offerId);

  if (!offerStats || isLoading)
    return <LoadingPage message="Fetching offer statistic ..." />;
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18} push={6}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                title={
                  <Typography.Title level={5}>
                    {t("OFFERED_POSITIONS")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {offerStats?.offered}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <Card
                title={
                  <Typography.Title level={5}>
                    {t("APPLICATIONS")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {offerStats?.applications}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <Card
                title={
                  <Typography.Title level={5}>{t("REJECTED")}</Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {offerStats?.rejected}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <Card
                title={
                  <Typography.Title level={5}>{t("ACCEPTED")}</Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {offerStats?.accepted}
                  </Typography.Title>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={6} pull={18}>
          <Card
            title={
              <Typography.Title level={3} style={{ color: "white" }}>
                {t("POSITIONS_TO_FILL")}
              </Typography.Title>
            }
            content={
              <Typography.Title
                level={1}
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {offerStats?.available}
              </Typography.Title>
            }
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(15, 28, 112)",
              color: "white",
              bottom: "16px",
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default OfferStats;

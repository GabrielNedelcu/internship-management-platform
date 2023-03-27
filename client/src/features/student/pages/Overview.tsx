import { Col, Row, Typography } from "antd";
import StudentStats from "../components/StudentStats";
import { useTranslation } from "react-i18next";
import LatestUpdatesList from "../components/LatestUpdatesList";
import MostAvailableOffers from "../components/MostAvailableOffers";

const Overview = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("OVERVIEW")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("OVERVIEW_STATS")}
      </Typography.Title>

      <StudentStats />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <LatestUpdatesList />
        </Col>

        <Col span={12}>
          <MostAvailableOffers />
        </Col>
      </Row>
    </>
  );
};

export default Overview;

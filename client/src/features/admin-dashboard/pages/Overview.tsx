import { Typography, Row } from "antd";
import { useTranslation } from "react-i18next";
import {
  MostDesiredCompaniesFOW,
  MostPositionsList,
  Stats,
} from "../components";
import MostDesiredOffers from "../components/MostDesiredOffers";

const Overview = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("OVERVIEW")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("ADMIN_OVERVIEW_MSG")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Stats />

        <MostPositionsList />

        <MostDesiredOffers />

        <MostDesiredCompaniesFOW />
      </Row>
    </>
  );
};
export default Overview;

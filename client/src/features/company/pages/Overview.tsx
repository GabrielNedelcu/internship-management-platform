import { Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import CompanyStats from "../components/CompanyStats";

const Overview = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("OVERVIEW")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("OVERVIEW_STATS")}
      </Typography.Title>

      <CompanyStats />
    </>
  );
};

export default Overview;

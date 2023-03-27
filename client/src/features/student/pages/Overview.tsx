import { Typography } from "antd";
import StudentStats from "../components/StudentStats";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("OVERVIEW")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("OVERVIEW_STATS")}
      </Typography.Title>

      <StudentStats />
    </>
  );
};

export default Overview;

import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import ApplicationsList from "../components/ApplicationsList";
const Applications = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("APPLICATIONS_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("APPLICATIONS_LIST_MSG")}
      </Typography.Title>

      <ApplicationsList />
    </>
  );
};

export default Applications;

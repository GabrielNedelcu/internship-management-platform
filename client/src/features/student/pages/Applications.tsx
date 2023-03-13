import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import ApplicationsList from "../components/ApplicationsList";

const Applications = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("YOUR_APLICATIONS")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("STUDENT_APPLICATIONS_PAGE_MSG")}
      </Typography.Title>

      <ApplicationsList />
    </>
  );
};

export default Applications;

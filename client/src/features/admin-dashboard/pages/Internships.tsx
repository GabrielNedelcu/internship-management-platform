import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { InternshipsList } from "../components";

const Internships = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography.Title level={1}>{t("INTERNSHIPS")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("INTERNSHIPS_MSG")}
      </Typography.Title>

      <InternshipsList />
    </>
  );
};

export default Internships;

import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CompaniesList } from "../components";

const Companies = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("COMPANIES_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("FIND_PERFECT_COMPANY")}
      </Typography.Title>

      <CompaniesList />
    </>
  );
};

export default Companies;

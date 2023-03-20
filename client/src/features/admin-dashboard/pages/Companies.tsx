import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { CompaniesList } from "../components";

const Companies = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("COMPANIES_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("VIEW_EDIT_COMPANIES")}
      </Typography.Title>

      <CompaniesList validatedOnly={true} />
    </>
  );
};

export default Companies;

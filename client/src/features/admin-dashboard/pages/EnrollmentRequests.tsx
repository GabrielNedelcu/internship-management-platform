import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { CompaniesList } from "../components";

const EnrollmentRequests = () => {
  const { t } = useTranslation();

  return (
    <>
      {""}
      <Typography.Title level={1}>{t("SIGN_UP_REQUESTS")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("REVIEW_SIGN_UP_REQUESTS")}
      </Typography.Title>

      <CompaniesList validatedOnly={false} />
    </>
  );
};

export default EnrollmentRequests;

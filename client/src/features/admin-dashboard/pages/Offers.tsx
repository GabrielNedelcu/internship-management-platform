import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { OffersList } from "../components";

const Offers = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("COMPANY_OFFERS")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("VIEW_EDIT_OFFERS")}
      </Typography.Title>

      <OffersList />
    </>
  );
};

export default Offers;

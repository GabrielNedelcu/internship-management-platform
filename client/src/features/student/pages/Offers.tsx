import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { OffersList } from "../components";

const Offers = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={1}>{t("OFFERS_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("APPLY_TO_DREAM_OFFER")}
      </Typography.Title>

      <OffersList />
    </>
  );
};

export default Offers;

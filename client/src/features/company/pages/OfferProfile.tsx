import { Typography } from "antd";
import { LoadingPage, Tabs } from "common";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";
import OfferOverview from "../components/OfferOverview";
import { FileSearchOutlined, SendOutlined } from "@ant-design/icons";
import ApplicationsList from "../components/ApplicationsList";
import { ITabProps } from "common/types";
import { useTranslation } from "react-i18next";

const OfferProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const offerId = params.offerID;
  const { offerData, isLoading } = useOfferProfile(offerId || "");

  if (!offerData || isLoading)
    return <LoadingPage message={t("FETCHING_OFFER_DATA")} />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <FileSearchOutlined />
          {t("OVERVIEW")}
        </span>
      ),
      key: "1",
      children: <OfferOverview offerData={offerData} />,
    },
    {
      label: (
        <span>
          <SendOutlined />
          {t("APPLICATIONS")}
        </span>
      ),
      key: "2",
      children: <ApplicationsList offerId={offerId} />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{offerData.title}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("DEPARTAMENT")}: {offerData.departament}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default OfferProfile;

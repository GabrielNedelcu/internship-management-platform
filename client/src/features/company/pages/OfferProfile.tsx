import { Typography } from "antd";
import { LoadingPage, Tabs } from "common";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";
import OfferOverview from "../components/OfferOverview";
import { FileSearchOutlined, SendOutlined } from "@ant-design/icons";
import ApplicationsList from "../components/ApplicationsList";
import { ITabProps } from "common/types";

const OfferProfile = () => {
  const params = useParams();
  const offerId = params.offerID;
  const { offerData, isLoading } = useOfferProfile(offerId || "");

  if (!offerData || isLoading)
    return <LoadingPage message="Fetching offer data ..." />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <FileSearchOutlined />
          Overview
        </span>
      ),
      key: "1",
      children: <OfferOverview offerData={offerData} />,
    },
    {
      label: (
        <span>
          <SendOutlined />
          Applications
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
        Departament: {offerData.departament}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default OfferProfile;

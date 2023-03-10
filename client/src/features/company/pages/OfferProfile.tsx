import { Typography } from "antd";
import { LoadingPage, TabNavigation } from "common";
import { useParams } from "react-router-dom";
import useOfferProfile from "../hooks/useOfferProfile";
import type { TTab } from "common";
import OfferOverview from "../components/OfferOverview";
import { FileSearchOutlined, SendOutlined } from "@ant-design/icons";

const OfferProfile = () => {
  const params = useParams();
  const offerId = params.offerID;
  const { offerData, isLoading } = useOfferProfile(offerId || "");

  if (!offerData || isLoading)
    return <LoadingPage message="Fetching offer data ..." />;

  const tabs: TTab[] = [
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
      children: "Applications list",
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{offerData.title}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Departament: {offerData.departament}
      </Typography.Title>

      <TabNavigation tabList={tabs} />
    </>
  );
};

export default OfferProfile;

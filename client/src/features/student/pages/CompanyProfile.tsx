import { InfoCircleOutlined, ProfileOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { LoadingPage, Tabs } from "common";
import { ITabProps } from "common/types";
import { getFieldOfWork } from "common/utils";
import { useParams } from "react-router-dom";
import { CompanyInfo, OffersList } from "../components";
import useCompanyProfile from "../hooks/useCompanyProfile";

const CompanyProfile = () => {
  const params = useParams();
  const companyId = params.companyID;
  const { companyData, isLoading } = useCompanyProfile(companyId || "");

  if (!companyData || isLoading)
    return <LoadingPage message="Fetching company data ..." />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <InfoCircleOutlined />
          About
        </span>
      ),
      key: "1",
      children: <CompanyInfo companyData={companyData} />,
    },
    {
      label: (
        <span>
          <ProfileOutlined />
          Offers
        </span>
      ),
      key: "2",
      children: <OffersList companyID={companyId} />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{companyData.name}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {getFieldOfWork(companyData.fieldOfWork)}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default CompanyProfile;

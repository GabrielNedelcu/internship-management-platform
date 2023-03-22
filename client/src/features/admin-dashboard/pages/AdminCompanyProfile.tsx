import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spin, Typography, Row, Col, Button, Space } from "antd";

import {
  ContainerOutlined,
  UserOutlined,
  ControlOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { LoadingPage, Tabs } from "common";
import { ITabProps } from "common/types";

import {
  CompanyOverview,
  CompanyEmployeesInfo,
  CompanyInternshipInfo,
  OffersList,
} from "../components";

import useCompanyProfile from "../hooks/useCompanyProfile";
import { getCompanyContract } from "../api";
import download from "downloadjs";

const AdminCompanyProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const companyID = params.companyId || "0";

  const { companyData, isLoading, mutateAcceptDeclineCompany } =
    useCompanyProfile(companyID);

  if (!companyData) return <LoadingPage message={t("FETCHING_COMPANY_DATA")} />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("GENERAL_INFORMATION")}
        </span>
      ),
      key: "1",
      children: <CompanyOverview companyData={companyData} />,
    },
    {
      label: (
        <span>
          <UserOutlined />
          {t("EMPLOYEES")}
        </span>
      ),
      key: "2",
      children: <CompanyEmployeesInfo companyData={companyData} />,
    },
    {
      label: (
        <span>
          <ControlOutlined />
          {t("INTERNSHIP_OPTIONS")}
        </span>
      ),
      key: "3",
      children: <CompanyInternshipInfo companyData={companyData} />,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined />
          {t("OFFERS")}
        </span>
      ),
      key: "4",
      children: <OffersList companyId={companyData._id || "0"} />,
    },
  ];

  return (
    <>
      <Spin spinning={isLoading} size="large" tip={t("FETCHING_COMPANY_DATA")}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{companyData.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {companyData.email}
            </Typography.Title>
          </Col>
          {!companyData.validated && (
            <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
              <Space>
                <Button
                  size="large"
                  onClick={() => {
                    mutateAcceptDeclineCompany(true);
                  }}
                >
                  {t("ACCEPT_COMPANY")}
                </Button>
                <Button
                  danger
                  size="large"
                  onClick={() => {
                    mutateAcceptDeclineCompany(false);
                  }}
                >
                  {t("REJECT_COMPANY")}
                </Button>
              </Space>
            </Col>
          )}
          {companyData.validated && (
            <Button
              size="large"
              onClick={async () => {
                const fileData = await getCompanyContract(companyID || "");
                download(fileData, `${companyData.name}_Signed_Contract.pdf`);
              }}
            >
              {t("DOWNLOAD_CONTRACT")}
            </Button>
          )}
        </Row>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminCompanyProfile;

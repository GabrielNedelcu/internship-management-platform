import {
  Spin,
  Typography,
  notification,
  Row,
  Col,
  Button,
  Space,
  Tooltip,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContainerOutlined,
  UserOutlined,
  ControlOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { Tabs } from "common";

import {
  CompanyOverview,
  CompanyEmployeesInfo,
  CompanyInternshipInfo,
  CompanyOffersInfo,
} from "../components";
import { getCompany, acceptCompany } from "../api/companiesAPI";
import { ITabProps } from "common/types";
import { useTranslation } from "react-i18next";

const AdminCompanyProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const companyID = params.companyId || "0";

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useQuery(
    ["getCompany", companyID],
    () => {
      setLoading(true);
      return getCompany(companyID);
    },
    {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_COMPANY_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateAcceptCompany } = useMutation(
    ["acceptCompany", companyID],
    (companyId: string) => {
      setLoading(true);
      return acceptCompany(companyId);
    },
    {
      onSuccess: () => {
        // Invalidate query in order to fetch all the companies excepting the one that has been
        // accepted on the platform
        queryClient.invalidateQueries(["getCompany", companyID]);

        notification.success({
          message: t("GREAT"),
          description: t("COMPANY_ACCEPTED"),
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_ACCEPT_COMPANIES"),
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={t("FETCHING_COMPANY_DATA")} />
      </>
    );

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("GENERAL_INFORMATION")}
        </span>
      ),
      key: "1",
      children: <CompanyOverview companyData={data} />,
    },
    {
      label: (
        <span>
          <UserOutlined />
          {t("EMPLOYEES")}
        </span>
      ),
      key: "2",
      children: <CompanyEmployeesInfo companyData={data} />,
    },
    {
      label: (
        <span>
          <ControlOutlined />
          {t("INTERNSHIP_OPTIONS")}
        </span>
      ),
      key: "3",
      children: <CompanyInternshipInfo companyData={data} />,
    },
    {
      label: (
        <span>
          <UnorderedListOutlined />
          {t("OFFERS")}
        </span>
      ),
      key: "4",
      children: <CompanyOffersInfo companyId={data._id} />,
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={t("FETCHING_COMPANY_DATA")}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{data.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {data.email}
            </Typography.Title>
          </Col>
          {!data.validated && (
            <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
              <Space>
                <Button
                  size="large"
                  onClick={() => {
                    mutateAcceptCompany(companyID);
                  }}
                >
                  {t("ACCEPT_COMPANY")}
                </Button>
                <Button
                  danger
                  size="large"
                  onClick={() => {
                    //TODO
                  }}
                >
                  {t("REJECT_COMPANY")}
                </Button>
              </Space>
            </Col>
          )}
        </Row>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminCompanyProfile;

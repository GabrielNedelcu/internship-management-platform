import { Typography, notification, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getOfferData } from "../api/offersAPI";

import {
  ContainerOutlined,
  UserOutlined,
  SendOutlined,
  LikeOutlined,
} from "@ant-design/icons";

import { OfferOverview } from "../components";

import { Tabs } from "common";
import EmployeeInfo from "../components/EmployeeInfo";
import { ITabProps } from "common/types";
import { useTranslation } from "react-i18next";
import StudentsTable from "../components/StudentsTable";

const AdminOfferProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const offerId = params.offerId;

  const [loading, setLoading] = useState(false);

  const { data } = useQuery(
    ["getOffer", offerId],
    () => {
      setLoading(true);
      return getOfferData(offerId || "0");
    },
    {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_OFFER_DATA"),
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={t("FETCHING_OFFER_DATA")} />
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
      children: <OfferOverview offerData={data} />,
    },
    {
      label: (
        <span>
          <UserOutlined />
          {t("SUPERVISOR")}
        </span>
      ),
      key: "2",
      children: <EmployeeInfo employeeData={data.supervisor} />,
    },
    {
      label: (
        <span>
          <SendOutlined />
          {t("APPLICATIONS")}
        </span>
      ),
      key: "3",
      children: "Applications",
    },
    {
      label: (
        <span>
          <LikeOutlined />
          {t("ACCEPTED_STUDENTS")}
        </span>
      ),
      key: "4",
      children: <StudentsTable offerId={offerId} />,
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={t("FETCHING_OFFER_DATA")}>
        <Typography.Title level={1}>{data.title}</Typography.Title>
        <Typography.Title level={5} type={"secondary"}>
          {data.companyName}
        </Typography.Title>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminOfferProfile;

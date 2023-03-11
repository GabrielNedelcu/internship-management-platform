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

import { OfferGeneralInfo } from "../components";

import { Tabs } from "common";
import EmployeeInfo from "../components/EmployeeInfo";
import { ITabProps } from "common/types";

const AdminOfferProfile = () => {
  const params = useParams();
  const offerId = params.offerId;

  const [loading, setLoading] = useState<boolean>(false);

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
          description:
            "Cannot retrieve the offer's data from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={"Fetching company data ..."} />
      </>
    );

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          General Information
        </span>
      ),
      key: "1",
      children: (
        <OfferGeneralInfo
          departament={data.departament}
          availablePos={data.availablePos}
          remainingAvailablePos={data.remainingAvailablePos}
          description={data.description}
          requirements={data.requirements}
          mentions={data.requirements}
        />
      ),
    },
    {
      label: (
        <span>
          <UserOutlined />
          Supervisor
        </span>
      ),
      key: "2",
      children: <EmployeeInfo employeeData={data.supervisor} />,
    },
    {
      label: (
        <span>
          <SendOutlined />
          Applications
        </span>
      ),
      key: "3",
      children: "Applications",
    },
    {
      label: (
        <span>
          <LikeOutlined />
          Accepted Students
        </span>
      ),
      key: "4",
      children: "Accepted Students",
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={"Fetching company data ..."}>
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

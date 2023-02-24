import { Typography, Row, Col, Divider } from "antd";
import { useParams } from "react-router-dom";

import {
  ContainerOutlined,
  UserOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { TabNavigation } from "common";
import type { TTab } from "common";

const tabs: TTab[] = [
  {
    label: (
      <span>
        <ContainerOutlined />
        General Information
      </span>
    ),
    key: "1",
    children: "General Information",
  },
  {
    label: (
      <span>
        <SendOutlined />
        Applications
      </span>
    ),
    key: "2",
    children: "Applications",
  },
  {
    label: (
      <span>
        <UserOutlined />
        Accepted Students
      </span>
    ),
    key: "3",
    children: "Accepted Students",
  },
];

const AdminOfferPage = () => {
  const params = useParams();
  const offerId = params.companyId;

  return (
    <>
      <Typography.Title level={1}>
        Customer Configuration Analyst
      </Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        McLaughlin, Reynolds and Rutherford
      </Typography.Title>

      <TabNavigation tabList={tabs} />
    </>
  );
};

export default AdminOfferPage;

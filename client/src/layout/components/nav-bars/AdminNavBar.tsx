import { useTranslation } from "react-i18next";

import {
  UserAddOutlined,
  LineChartOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";

import { getNavBarMenuItem, NavBar } from "common";

import { INavBarProps } from "common/types";

const keyToRedirectPath = new Map<string, string>([
  ["1", "/dashboard/admin"],
  ["2", "/dashboard/admin/students"],
  ["3", "/dashboard/admin/teachers"],
  ["4", "/dashboard/admin/companies"],
  ["5", "/dashboard/admin/requests"],
  ["6", "/dashboard/admin/offers"],
  ["7", "/dashboard/admin/internships"],
]);

const AdminNavBar = ({ selectedKey }: INavBarProps) => {
  const { t } = useTranslation();

  const menuItems = [
    getNavBarMenuItem(t("OVERVIEW"), "1", <LineChartOutlined />),
    getNavBarMenuItem(t("ACCOUNTS"), "sub1", <TeamOutlined />, [
      getNavBarMenuItem(t("STUDENTS"), "2", <UserOutlined />),
      getNavBarMenuItem(t("PROFESSORS"), "3", <UserOutlined />),
      getNavBarMenuItem(t("COMPANIES"), "4", <UserOutlined />),
    ]),
    getNavBarMenuItem(t("SIGN_UP_REQUESTS"), "5", <UserAddOutlined />),
    getNavBarMenuItem(t("OFFERS"), "6", <ProfileOutlined />),
    getNavBarMenuItem(t("INTERNSHIPS"), "7", <ReconciliationOutlined />),
  ];

  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default AdminNavBar;

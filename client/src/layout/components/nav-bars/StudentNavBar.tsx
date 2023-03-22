import { useTranslation } from "react-i18next";

import {
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  ProfileOutlined,
  SendOutlined,
  ControlOutlined,
} from "@ant-design/icons";

import { getNavBarMenuItem, NavBar } from "common";
import { INavBarProps } from "common/types";

const keyToRedirectPath = new Map<string, string>([
  ["1", "/student/overview"],
  ["2", "/student/profile"],
  ["3", "/student/companies"],
  ["4", "/student/offers"],
  ["5", "/student/applications"],
  ["6", "/student/internship"],
]);

const StudentNavBar = ({ selectedKey }: INavBarProps) => {
  const { t } = useTranslation();

  const menuItems = [
    getNavBarMenuItem(t("OVERVIEW"), "1", <LineChartOutlined />),
    getNavBarMenuItem(t("PROFILE"), "2", <ControlOutlined />),
    getNavBarMenuItem(t("COMPANIES"), "3", <UserOutlined />),
    getNavBarMenuItem(t("OFFERS"), "4", <ProfileOutlined />),
    getNavBarMenuItem(t("APPLICATIONS"), "5", <SendOutlined />),
    getNavBarMenuItem(t("INTERNSHIP"), "6", <SettingOutlined />),
  ];
  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default StudentNavBar;

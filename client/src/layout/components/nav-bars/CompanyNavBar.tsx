import { useTranslation } from "react-i18next";

import {
  LineChartOutlined,
  SettingOutlined,
  ProfileOutlined,
  SendOutlined,
  ControlOutlined,
} from "@ant-design/icons";

import { INavBarProps } from "common/types";
import { getNavBarMenuItem, NavBar } from "common";

const keyToRedirectPath = new Map<string, string>([
  ["1", "/company/overview"],
  ["2", "/company/profile"],
  ["3", "/company/offers"],
  ["4", "/company/applications"],
  ["5", "/company/internships"],
]);

const CompanyNavBar = ({ selectedKey }: INavBarProps) => {
  const { t } = useTranslation();

  const menuItems = [
    getNavBarMenuItem(t("OVERVIEW"), "1", <LineChartOutlined />),
    getNavBarMenuItem(t("PROFILE"), "2", <ControlOutlined />),
    getNavBarMenuItem(t("OFFERS"), "3", <ProfileOutlined />),
    getNavBarMenuItem(t("APPLICATIONS"), "4", <SendOutlined />),
    getNavBarMenuItem(t("INTERNSHIPS"), "5", <SettingOutlined />),
  ];

  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default CompanyNavBar;

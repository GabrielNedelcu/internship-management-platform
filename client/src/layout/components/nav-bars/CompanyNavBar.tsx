import { getNavBarMenuItem, NavBar } from "common";
import {
  LineChartOutlined,
  SettingOutlined,
  ProfileOutlined,
  SendOutlined,
  ControlOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { INavBarProps } from "common/types";

const menuItems = [
  getNavBarMenuItem("Overview", "1", <LineChartOutlined />),
  getNavBarMenuItem("Profile", "2", <ControlOutlined />),
  getNavBarMenuItem("Offers", "3", <ProfileOutlined />),
  getNavBarMenuItem("Applications", "4", <SendOutlined />),
  getNavBarMenuItem("Internships", "5", <SettingOutlined />),
  getNavBarMenuItem("Documents", "6", <FileOutlined />),
];

const keyToRedirectPath = new Map<string, string>([
  ["1", "/company/overview"],
  ["2", "/company/profile"],
  ["3", "/company/offers"],
  ["4", "/company/applications"],
  ["5", "/company/internships"],
  ["6", "/company/documents"],
]);

const CompanyNavBar = ({ selectedKey }: INavBarProps) => {
  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default CompanyNavBar;

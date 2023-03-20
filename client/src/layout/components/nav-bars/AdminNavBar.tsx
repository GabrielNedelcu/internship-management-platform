import { getNavBarMenuItem, NavBar } from "common";
import {
  FileOutlined,
  UserAddOutlined,
  LineChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
  MailOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { INavBarProps } from "common/types";

const menuItems = [
  getNavBarMenuItem("Overview", "1", <SettingOutlined />),
  getNavBarMenuItem("Accounts", "sub1", <TeamOutlined />, [
    getNavBarMenuItem("Students", "2", <UserOutlined />),
    getNavBarMenuItem("Teachers", "3", <UserOutlined />),
    getNavBarMenuItem("Companies", "4", <UserOutlined />),
  ]),
  getNavBarMenuItem("Sign-Up Requests", "5", <UserAddOutlined />),
  getNavBarMenuItem("Company Offers", "6", <ProfileOutlined />),
  getNavBarMenuItem("Internships", "7", <ReconciliationOutlined />),
  getNavBarMenuItem("Statistics", "8", <LineChartOutlined />),
  getNavBarMenuItem("Documents", "9", <FileOutlined />),
  getNavBarMenuItem("Messages", "10", <MailOutlined />),
];

const keyToRedirectPath = new Map<string, string>([
  ["1", "/dashboard/admin"],
  ["2", "/dashboard/admin/students"],
  ["3", "/dashboard/admin/teachers"],
  ["4", "/dashboard/admin/companies"],
  ["5", "/dashboard/admin/requests"],
  ["6", "/dashboard/admin/offers"],
  ["7", "/dashboard/admin/internships"],
  ["8", "/dashboard/admin/stats"],
  ["9", "/dashboard/admin/documents"],
  ["10", "/dashboard/admin/messages"],
]);

const AdminNavBar = ({ selectedKey }: INavBarProps) => {
  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default AdminNavBar;

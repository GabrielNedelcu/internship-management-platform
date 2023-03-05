import { getNavBarMenuItem, NavBar } from "common";
import {
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  ProfileOutlined,
  SendOutlined,
  ControlOutlined,
} from "@ant-design/icons";

const menuItems = [
  getNavBarMenuItem("Overview", "1", <LineChartOutlined />),
  getNavBarMenuItem("Profile", "2", <ControlOutlined />),
  getNavBarMenuItem("Companies", "3", <UserOutlined />),
  getNavBarMenuItem("Offers", "4", <ProfileOutlined />),
  getNavBarMenuItem("Applications", "5", <SendOutlined />),
  getNavBarMenuItem("Internship", "6", <SettingOutlined />),
];

const keyToRedirectPath = new Map<string, string>([
  ["1", "/student/overview"],
  ["2", "/student/profile"],
  ["3", "/student/companies"],
  ["4", "/student/offers"],
  ["5", "/student/applications"],
  ["6", "/student/internship"],
]);

interface IStudentNavBarProps {
  selectedKey: string;
}

const StudentNavBar = ({ selectedKey }: IStudentNavBarProps) => {
  return (
    <NavBar
      items={menuItems}
      selectedKey={selectedKey}
      itemKeyToRedirectPath={keyToRedirectPath}
    />
  );
};

export default StudentNavBar;

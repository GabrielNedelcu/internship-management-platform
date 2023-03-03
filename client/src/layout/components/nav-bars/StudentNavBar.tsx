import { getNavBarMenuItem, NavBar } from "common";
import {
  LineChartOutlined,
  SettingOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const menuItems = [
  getNavBarMenuItem("Overview", "1", <LineChartOutlined />),
  getNavBarMenuItem("Companies", "2", <UserOutlined />),
  getNavBarMenuItem("Offers", "3", <ProfileOutlined />),
  getNavBarMenuItem("Internship", "4", <SettingOutlined />),
];

const keyToRedirectPath = new Map<string, string>([
  ["1", "/student/overview"],
  ["2", "/student/companies"],
  ["3", "/student/offers"],
  ["4", "/student/internship"],
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

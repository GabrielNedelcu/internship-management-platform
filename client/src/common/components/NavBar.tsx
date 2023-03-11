import { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import "../../style/NavBar.css";

import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getNavBarMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

interface INavBarProps {
  items: MenuItem[];
  itemKeyToRedirectPath: Map<string, string>;
  selectedKey: string;
}

const NavBar = ({
  items,
  itemKeyToRedirectPath,
  selectedKey,
}: INavBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout.Sider
      collapsible={true}
      collapsed={collapsed}
      onCollapse={(value: boolean) => setCollapsed(value)}
      width={300}
    >
      <div className="LogoContainer">ETTI Internships</div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        selectedKeys={[selectedKey]}
        mode="inline"
        items={items}
        onClick={({ key }) => {
          return navigate(itemKeyToRedirectPath.get(key) || "*");
        }}
      />
    </Layout.Sider>
  );
};

export { NavBar, getNavBarMenuItem };

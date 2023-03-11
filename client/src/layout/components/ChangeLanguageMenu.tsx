import { useContext } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Button, Space } from "antd";
import { GlobalOutlined, DownOutlined } from "@ant-design/icons";

import { LanguageContext } from "app/contexts/LanguageContext";

const menuItems: MenuProps["items"] = [
  {
    key: "en",
    label: "en",
  },
  {
    key: "ro",
    label: "ro",
  },
];

const ChangeLanguageMenu = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <>
      <Dropdown
        menu={{
          items: menuItems,
          onClick: (e) => {
            setLanguage(e.key);
          },
          selectedKeys: [language],
        }}
      >
        <Button>
          <Space>
            <GlobalOutlined />
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};
export default ChangeLanguageMenu;

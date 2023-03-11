import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import useAccountSettingsMenu from "layout/hooks/useAccountSettingsMenu";
import ChangePasswordModal from "./ChangePasswordModal";

const menuItems: MenuProps["items"] = [
  {
    key: "passChange",
    label: "Change your password",
    icon: <LockOutlined />,
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const AccountSettingsMenu = () => {
  const { handleMenuOnClick, onAfterModalOK, openChangePasswordModal } =
    useAccountSettingsMenu();

  return (
    <>
      <ChangePasswordModal
        openModal={openChangePasswordModal}
        onAfterOK={onAfterModalOK}
      />

      <Dropdown
        menu={{
          items: menuItems,
          onClick: (e) => {
            handleMenuOnClick(e.key);
          },
        }}
      >
        <Button icon={<UserOutlined />} type="primary">
          Account Settings
        </Button>
      </Dropdown>
    </>
  );
};

export default AccountSettingsMenu;

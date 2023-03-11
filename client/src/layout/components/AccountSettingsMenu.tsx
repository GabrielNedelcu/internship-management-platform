import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import useAccountSettingsMenu from "layout/hooks/useAccountSettingsMenu";
import ChangePasswordModal from "./ChangePasswordModal";

const AccountSettingsMenu = () => {
  const { handleMenuOnClick, onAfterModalOK, openChangePasswordModal } =
    useAccountSettingsMenu();

  const { t } = useTranslation();

  const menuItems: MenuProps["items"] = [
    {
      key: "passChange",
      label: t("CHANGE_PASS"),
      icon: <LockOutlined />,
    },
    {
      key: "logout",
      label: t("LOGOUT"),
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

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
          {t("ACCOUNT_SETTINGS")}
        </Button>
      </Dropdown>
    </>
  );
};

export default AccountSettingsMenu;

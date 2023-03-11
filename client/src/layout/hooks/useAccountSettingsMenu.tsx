import { logoutAccount } from "common/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useState } from "react";

const useAccountSettingsMenu = () => {
  const navigate = useNavigate();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const { mutate: mutateLogoutUser } = useMutation(
    ["logoutUser"],
    () => logoutAccount(),
    {
      onSuccess: () => {
        localStorage.clear();
        notification.success({
          message: "Logout Successfull ...",
          description: "You have successfully logged out from your account!",
          duration: 10,
        });
        navigate("/");
      },
      onError: () => {
        localStorage.clear();
        navigate("/");
      },
    }
  );

  const handleMenuOnClick = (itemKey: string) => {
    switch (itemKey) {
      case "passChange": {
        setOpenChangePasswordModal(true);
        break;
      }
      case "logout": {
        mutateLogoutUser();
        break;
      }
    }
  };

  const onAfterModalOK = () => {
    setOpenChangePasswordModal(false);
  };

  return { handleMenuOnClick, openChangePasswordModal, onAfterModalOK };
};

export default useAccountSettingsMenu;

import {
  Typography,
  Button,
  Divider,
  Layout,
  Avatar,
  notification,
} from "antd";
import { useContext } from "react";
import { logoutAccount } from "common/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "app/contexts/UserContext";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();

  const handlePostLogout = () => {
    notification.success({
      message: "Logout Successfull ...",
      description: "You have successfully logged out from your account!",
      duration: 10,
    });

    localStorage.clear();

    navigate("/");
  };

  const { mutate: mutateLogoutUser } = useMutation(
    ["logoutUser"],
    () => logoutAccount(),
    {
      onSuccess: () => {
        handlePostLogout();
      },
      onError: () => {
        handlePostLogout();
      },
    }
  );

  return (
    <>
      <Layout.Header style={{ padding: 0, background: "white" }}>
        <div style={{ float: "right", display: "inline", marginRight: "20px" }}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => {
              mutateLogoutUser();
            }}
          >
            Log Out
          </Button>
          <Divider type="vertical" />
          <Avatar icon={<UserOutlined />} />
          <Typography.Title
            style={{ display: "inline", margin: "10px" }}
            level={5}
          >
            Administrator
          </Typography.Title>
        </div>
      </Layout.Header>
    </>
  );
};

export default Header;

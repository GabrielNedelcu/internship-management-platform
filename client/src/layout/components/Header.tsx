import { Typography, Button, Divider, Layout, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <>
      <Layout.Header style={{ padding: 0, background: "white" }}>
        <div style={{ float: "right", display: "inline", marginRight: "20px" }}>
          <Button type="primary" icon={<LogoutOutlined />}>
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

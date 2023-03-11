import { Divider, Layout } from "antd";

import AccountSettingsMenu from "./components/AccountSettingsMenu";

const Header = () => {
  return (
    <>
      <Layout.Header style={{ padding: 0, background: "white" }}>
        <div style={{ float: "right", display: "inline", marginRight: "20px" }}>
          <Divider type="vertical" />
          <AccountSettingsMenu />
        </div>
      </Layout.Header>
    </>
  );
};

export default Header;

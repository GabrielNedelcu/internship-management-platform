import { ReactElement } from "react";
import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

type TDashboardProps = {
  sider: ReactElement;
  content?: ReactElement;
};

const AppLayout = ({ sider, content }: TDashboardProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {sider}
      <Layout className="site-layout">
        <Header />
        <Content style={{ margin: "18px 18px", padding: "24px" }}>
          {content}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

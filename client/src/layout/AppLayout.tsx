import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import { ILayoutProps } from "common/types";

const AppLayout = ({ sider, content }: ILayoutProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {sider}
      <Layout className="site-layout">
        <Header />
        <Layout.Content style={{ margin: "18px 18px", padding: "24px" }}>
          {content}
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

import { ReactElement } from "react";
import { Breadcrumb, Layout } from "antd";

const { Header, Content, Footer } = Layout;

type TDashboardProps = {
  sider: ReactElement;
  content?: ReactElement;
};

const DashboardLayout = ({ sider, content }: TDashboardProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {sider}
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "white" }} />
        <Content style={{ margin: "18px 18px", padding: "24px" }}>
          {content}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Universitatea Politehnica Bucuresti ©2022 Created by Nedelcu Gabriel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

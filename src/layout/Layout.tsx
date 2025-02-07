import React, { ReactNode } from "react";
import { Layout, Breadcrumb } from "antd";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/sidebar";

interface LayoutProps {
    children: ReactNode;
    breadcrumbItems?: string[];
  }

const { Content, Sider } = Layout;

export const BaseLayout: React.FC<LayoutProps> = ({ children, breadcrumbItems }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider collapsible style={{ backgroundColor: "#FFF" }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: "16px", minHeight:"100vh" }}>
          <Breadcrumb items={breadcrumbItems?.map(item => ({ title: item }))} style={{ marginBottom: "16px" }} />
          <Content style={{ display: "flex", flexDirection: "column", gap:"1rem" }}>
            {children}
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

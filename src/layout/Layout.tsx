import React, { ReactNode } from "react";
import { Layout, Breadcrumb, Space, Typography } from "antd";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/sidebar";


interface LayoutProps {
    children: ReactNode;
    breadcrumbItems?: string[];
    tituloPagina:string
  }

const { Content, Sider } = Layout;

export const BaseLayout: React.FC<LayoutProps> = ({ children, breadcrumbItems, tituloPagina }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider collapsible style={{ backgroundColor: "#FFF" }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: '16px', minHeight: '100vh' }}>
      <Breadcrumb 
        items={breadcrumbItems?.map(item => ({ title: item }))} 
        style={{ marginBottom: '16px' }} 
      />
      <Content style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
          <Space  style={{
            backgroundColor: '#ffffff', // Fondo blanco
            padding: 16, // Espaciado interno
            borderLeft: '4px solid #065F46', // Borde morado/violeta
            display: 'flex',
            alignItems: 'center',
          }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {tituloPagina.toUpperCase()}
            </Typography.Title>
          </Space>
        
        {children}
      </Content>
    </Content>
      </Layout>
    </Layout>
  );
};

import { Breadcrumb, Layout } from "antd";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Header } from "../../components/Header/Header";
import { HomeCardUsers } from "./HomeCardUsers";
import HomeCardRentas from "./HomeCardRentas";
import { HomeCardGraphics } from "./HomeCardGraphics";

const { Content, Sider } = Layout;

export const Home = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider collapsible style={{ backgroundColor: "#FFF" }}>
          <Sidebar />
        </Sider>
        <Content style={{ padding: "0 16px 30px 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item>Tablero de Inicio</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <HomeCardUsers />
            <div style={{ display: "flex", gap: "16px" }}>
              <HomeCardRentas />
              <HomeCardGraphics />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

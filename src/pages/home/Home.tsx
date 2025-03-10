import {  Space } from "antd"
import { HomeCardGraphics } from "../../components/Home/HomeCardGraphics"
import HomeCardRentas from "../../components/Home/HomeCardRentas"
import { HomeCardUsers } from "../../components/Home/HomeCardUsers"
import { BaseLayout } from "../../layout/Layout"


export const Home = () => {
  return (
    <BaseLayout tituloPagina="inicio" breadcrumbItems={['home']}>
      <Space direction="vertical" size="middle">
            <HomeCardUsers />
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{width:'50%'}}>
                <HomeCardRentas />
              </div>
              <HomeCardGraphics />
            </div>
      </Space>
    </BaseLayout>
  )
}

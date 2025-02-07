import {
    HomeOutlined,
    DatabaseOutlined,
    UserOutlined,
    FileSearchOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  
  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: <a href="/home">Gestión de Rentas (Inicio)</a> },
    {
      key: "2",
      icon: <DatabaseOutlined />,
      label: "Rentas",
      children: [
        { key: "2.1", label: <a href="/caso-rentas">Radicados de Rentas</a> },
        { key: "2.2", label: <a href="/caso-rentas-finalizados">Casos Finalizados</a> },
      ],
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <a href="/usuarios">Usuarios</a> ,
      
    },
    {
      key: "4",
      icon: <FileSearchOutlined />,
      label: "Rentas y Registro",
      children: [
        { key: "4.1", label: <a href="/Facturas">Facturas</a> },
        { key: "4.2", label: <a href="/Data">data</a> },
        { key: "4.3", label: "Campo disponible" },
      ],
    }
  ];
  
  export const Sidebar = () => (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={menuItems}
      style={{ backgroundColor: "#FFFFFF", fontWeight: "500" }}
    />
  );
  
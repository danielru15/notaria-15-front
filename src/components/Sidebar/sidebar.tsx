import {
  HomeOutlined,
  FileSearchOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: <NavLink to="/home">Inicio</NavLink>,
  },
  {
    key: "/caso-rentas",
    icon:<FileOutlined />,
    label: <NavLink to="/caso-rentas">Radicados de Rentas</NavLink> 
  },
  {
    key: "/usuarios",
    icon: <TeamOutlined />,
    label: <NavLink to="/usuarios">Usuarios</NavLink>,
  },
  {
    key: "/rentas-registro",
    icon: <FileSearchOutlined />,
    label: "Rentas y Registro",
    children: [
      { key: "/rentas-y-registro", label: <NavLink to="/rentas-y-registro">RyR</NavLink> },
      { key: "/data", label: <NavLink to="/data">Data</NavLink> },
      { key: "campo-disponible", label: "Campo disponible" },
    ],
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]} // Resalta el menú activo
      items={menuItems.map(item => ({
        ...item,
        style: location.pathname === item.key ? { borderRight: '4px solid #065F46' } : {},
        children: item.children?.map(child => ({
          ...child,
          style: location.pathname === child.key ? { borderRight: '4px solid #065F46' } : {}
        }))
      }))}
      style={{ backgroundColor: "#FFFFFF", fontWeight: "500" }}
    />
  );
};

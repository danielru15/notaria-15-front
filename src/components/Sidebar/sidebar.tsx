import {
  HomeOutlined,
  DatabaseOutlined,
  UserOutlined,
  FileSearchOutlined,
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
    icon: <DatabaseOutlined />,
    label: "Rentas",
    children: [
      { key: "/caso-rentas-activos", label: <NavLink to="/caso-rentas">Radicados de Rentas</NavLink> },
      { key: "/caso-rentas-finalizados", label: <NavLink to="/caso-rentas-finalizados">Casos Finalizados</NavLink> },
    ],
  },
  {
    key: "/usuarios",
    icon: <UserOutlined />,
    label: <NavLink to="/usuarios">Usuarios</NavLink>,
  },
  {
    key: "/rentas-registro",
    icon: <FileSearchOutlined />,
    label: "Rentas y Registro",
    children: [
      { key: "/facturas", label: <NavLink to="/facturas">Facturas</NavLink> },
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
      items={menuItems}
      style={{ backgroundColor: "#FFFFFF", fontWeight: "500" }}
    />
  );
};

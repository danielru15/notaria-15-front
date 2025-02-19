import { useState } from "react";
import { Avatar, Layout, Typography, Flex, Dropdown, MenuProps } from "antd";
import { LogoutOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/users/useAuth";
import { ProfileDrawer } from "../profile/ProfileDrawer";
import { capitalizeFirstLetter, getColorFromEmail, getInitial } from "../../utils/profileUtils";


const { Header: AntHeader } = Layout;

export const Header = () => {
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  



  // Opciones del dropdown
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Ver perfil",
      icon: <UserOutlined />,
      onClick: () => setIsDrawerOpen(true), // Abrir drawer de perfil
    },
    {
      key: "2",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <>
      <AntHeader
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          padding: "13px 16px",
        }}
      >
        <Typography.Title
          style={{
            color: "#fff",
            fontSize: "16px",
            margin: 0,
          }}
        >
          SISTEMA DE GESTIÓN NOTARIA 15
        </Typography.Title>

        <Flex gap="middle">
          <Dropdown menu={{ items }} placement="bottomRight">
            <Flex gap="small" style={{ alignItems: "center", cursor: "pointer" }}>
              <Avatar
                style={{ backgroundColor: getColorFromEmail(user?.name || "") }}
              >
                {getInitial(user?.name || "")}
              </Avatar>
              <Typography.Paragraph style={{ color: "#fff", margin: 0 }}>
                {`${capitalizeFirstLetter(user?.name)} ${capitalizeFirstLetter(user?.last_name)}`}
              </Typography.Paragraph>
              <DownOutlined style={{ color: "#fff" }} />
            </Flex>
          </Dropdown>
        </Flex>
      </AntHeader>

      {/* Drawer de perfil */}
      <ProfileDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} user={user} />
    </>
  );
};
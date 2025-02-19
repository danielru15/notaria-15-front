import React from "react";
import { Card, Avatar, Space, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Text } = Typography;

const UserCard: React.FC = () => (
  <Card style={{ borderRadius: 8, padding: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Space>
        <Avatar size={40} icon={<MoreOutlined />} />
        <div>
          <Text strong>Mariela de Jesus Villa Escobar</Text>
          <br />
          <Text type="secondary">Lorem Ipsum | Lorem Ipsum | Lorem ipsum dolor sit amet</Text>
        </div>
      </Space>
      <Space>
        <Text type="secondary" style={{ color: "#8B5CF6", cursor: "pointer" }}>Editar</Text>
        <Text type="danger" style={{ cursor: "pointer" }}>Eliminar</Text>
        <Text type="success">Activo</Text>
      </Space>
    </div>
  </Card>
);

export default UserCard;

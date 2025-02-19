import { Drawer, Descriptions, Avatar, Typography, Flex, Divider } from "antd";
import { User } from "../../interfaces/user.interface";
import { getColorFromEmail, getInitial } from "../../utils/profileUtils";
import dayjs from "dayjs";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export const ProfileDrawer = ({ open, onClose, user }: ProfileDrawerProps) => {
  

  return (
    <Drawer width={420} title="Perfil de Usuario" placement="right" onClose={onClose} open={open}>
      <Flex align="center" justify="center" vertical>
        {/* Avatar con iniciales */}
            <Avatar
            size={80}
            style={{ backgroundColor: getColorFromEmail(user?.name || "") }}>
                {getInitial(user?.name || "")}
            </Avatar>

        <Typography.Title level={4} style={{ marginTop: 12 }}>
          {user?.name} {user?.last_name}
        </Typography.Title>
        <Typography.Text type="secondary">{user?.email}</Typography.Text>
      </Flex>

      <Divider />

      <Descriptions column={1} bordered>
        <Descriptions.Item label="Rol">{user?.rol || "No disponible"}</Descriptions.Item>
        <Descriptions.Item label="Cargo">{user?.cargo || "No disponible"}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Creación">{dayjs(user?.created_at).format("DD-MM-YYYY")}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

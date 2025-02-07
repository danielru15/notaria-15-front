import { Drawer, Descriptions } from "antd";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: { complete_name: string } | null;
}

export const ProfileDrawer = ({ open, onClose, user }: ProfileDrawerProps) => {
  return (
    <Drawer  width={720} title="Perfil de Usuario" placement="right" onClose={onClose} open={open}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Nombre Completo">
          {user?.complete_name || "No disponible"}
        </Descriptions.Item>
        {/* Puedes agregar más información aquí si la tienes */}
      </Descriptions>
    </Drawer>
  );
};

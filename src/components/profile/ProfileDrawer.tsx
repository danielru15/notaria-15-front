import { useState, useEffect } from "react";
import { Drawer, Descriptions, Avatar, Typography, Flex, Divider, Button, Form, Input, Alert } from "antd";
import { User } from "../../interfaces/user.interface";
import { capitalizeFirstLetter, getColorFromEmail, getInitial, validatePassword } from "../../utils/profileUtils";
import dayjs from "dayjs";
import { notaria15Api } from "../../api/notaria.api";
import { useAuth } from "../../hooks/users/useAuth";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export const ProfileDrawer = ({ open, onClose, user }: ProfileDrawerProps) => {
  const [changingPassword, setChangingPassword] = useState(false);
  const { logout, setPasswordChanged} = useAuth();
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (!open) {
      form.resetFields();
      setChangingPassword(false);   
      setError(null); // Limpiar el error al cerrar
    }
  }, [open, form]);

  const handleChangePassword = async (values: { oldPassword: string; newPassword: string }) => {
    setError(null);
    if(user){ 
      try {
        const { data } = await notaria15Api.put("/users/change-password", values);
        if (data) {
          form.resetFields();
          setPasswordChanged(true)
          logout();
        }
      } catch (error) {
        setError("Error al cambiar la contraseña. Verifique sus datos e intente nuevamente.");
      }
    }
  };

  return (
    <Drawer width={420} title="Perfil de Usuario" placement="right" onClose={onClose} open={open}>
      <Flex align="center" justify="center" vertical>
        <Avatar size={80} style={{ backgroundColor: getColorFromEmail(user?.name || "") }}>
          {getInitial(user?.name as string) || ""}
        </Avatar>

        <Typography.Title level={4} style={{ marginTop: 12 }}>
          {`${capitalizeFirstLetter(user?.name)} ${capitalizeFirstLetter(user?.last_name)}`}
        </Typography.Title>
        <Typography.Text type="secondary">{user?.email}</Typography.Text>
      </Flex>

      <Divider />

      {!changingPassword ? (
        <>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Rol">{user?.rol || "No disponible"}</Descriptions.Item>
            <Descriptions.Item label="Cargo">{user?.cargo || "No disponible"}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Creación">{dayjs(user?.created_at).format("DD-MM-YYYY")}</Descriptions.Item>
          </Descriptions>

          <Button type="primary" block style={{ marginTop: 16 }} onClick={() => setChangingPassword(true)}>
            Cambiar Contraseña
          </Button>
        </>
      ) : (
        <>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "1rem" }} />}
          <Form form={form} layout="vertical" onFinish={handleChangePassword}>
            <Form.Item 
              label="Contraseña Antigua" 
              name="oldPassword"
              rules={[{ required: true, message: "Ingrese su contraseña actual" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item 
              label="Nueva Contraseña" 
              name="newPassword"
              rules={[
                { required: true, message: "Ingrese una contraseña" },
                { validator: validatePassword }, // Validación en tiempo real
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Flex gap="small">
              <Button block onClick={() => setChangingPassword(false)}>Cancelar</Button>
              <Button type="primary" block htmlType="submit">Guardar</Button>
            </Flex>
          </Form>
        </>
      )}
    </Drawer>
  );
};

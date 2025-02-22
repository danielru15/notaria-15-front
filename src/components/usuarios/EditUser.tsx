import React from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { User } from "../../interfaces/user.interface";
import { useEditUser } from "../../hooks/users/useEditerUser";
import { useFetchUsers } from "../../hooks/users/useAllUsers";

const { Option } = Select;

interface EditUserDrawerProps {
  user: User | null;
  onClose: () => void;
}

const EditUserDrawer: React.FC<EditUserDrawerProps> = ({ user, onClose }) => {
  const [form] = Form.useForm();
  const { editUser } = useEditUser();
 const { fetchUsers } = useFetchUsers()


  if (!user) return null; // No renderiza el Drawer si no hay usuario seleccionado

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await editUser(user.id, { rol: values.rol, cargo: values.cargo }, user);
      await fetchUsers()
      onClose();
  } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  return (
    <Drawer
      title="Editar Usuario"
      width={720}
      onClose={onClose}
      open={!!user}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={handleSave}>Guardar</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" initialValues={user}>
      <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Nombre">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="last_name" label="Apellido">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="email" label="Correo Electrónico">
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="rol" label="Rol">
              <Select>
                <Option value="ADMIN">Admin</Option>
                <Option value="EDITOR">Editor</Option>
                <Option value="VIEWER">Viewer</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="cargo" label="Cargo">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="Descripción">
              <Input.TextArea rows={4} readOnly />
            </Form.Item>
          </Col>
        </Row>
        
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;

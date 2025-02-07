import { Button, Col, Form, Input, Row, Select } from "antd";
import CardContainer from "../CardContainer/CardContainer";

const { Option } = Select;

const CreateUser = () => {
  const [form] = Form.useForm();

  const handleSubmit = (data:any) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <CardContainer title="CREAR USUARIOS">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nombre"
              name="first_name"
              rules={[{ required: true, message: "Ingrese el nombre" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Apellido"
              name="last_name"
              rules={[{ required: true, message: "Ingrese el apellido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Correo Electrónico"
              name="email"
              rules={[{ required: true, type: "email", message: "Ingrese un correo electrónico válido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Ingrese una contraseña" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Cargo"
              name="role"
              rules={[{ required: true, message: "Seleccione un cargo" }]}
            >
              <Select placeholder="Seleccione un cargo">
                <Option value="admin">Administrador</Option>
                <Option value="editor">Editor</Option>
                <Option value="viewer">Visualizador</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rol"
              name="user_role"
              rules={[{ required: true, message: "Seleccione un rol" }]}
            >
              <Select placeholder="Seleccione un rol">
                <Option value="manager">Gerente</Option>
                <Option value="staff">Empleado</Option>
                <Option value="intern">Practicante</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Observaciones" name="observations">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar Usuario
          </Button>
        </Form.Item>
      </Form>
    </CardContainer>
  );
};

export default CreateUser;
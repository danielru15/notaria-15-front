import { Button, Col, Form, Input, Row, Select } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { passwordSchema } from "../../utils/passWordValidate";
import { useFetchUsers } from "../../hooks/users/useAllUsers";
import ProtectedRoutes from "../protectRoutes/ProtectRoutes";

const { Option } = Select;

const CreateUser = () => {
  const [form] = Form.useForm();
  const { createUser} = useCreateUser();
  const { fetchUsers } = useFetchUsers()
  // enviamos los datos
  const handleSubmit = async (data:any) => {
       const success = await createUser(data);
       fetchUsers()
    if (success) form.resetFields();
   
  };

  // Función para validar la contraseña en tiempo real
  const validatePassword = ( _:any,value: string) => {
    const result = passwordSchema.safeParse(value);
    if (!result.success) {
      return Promise.reject(result.error.errors[0].message);
    }
    return Promise.resolve();
  };

  return (
    <ProtectedRoutes roles={["ADMIN", "EDITOR"]}>
      <CardContainer title="CREAR USUARIOS">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="name"
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
                rules={[
                  { required: true, message: "Ingrese una contraseña" },
                  { validator: validatePassword }, // Validación en tiempo real
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Cargo"
                name="cargo"
                rules={[{ required: true, message: "Seleccione un cargo" }]}
              >
                <Select placeholder="Seleccione un cargo">
                  <Option value="rentas">Rentas</Option>
                  <Option value="Contabilidad">Contabilidad</Option>
                  <Option value="protocolista">Protocolista</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rol"
                name="rol"
                rules={[{ required: true, message: "Seleccione un rol" }]}
              >
                <Select placeholder="Seleccione un rol">
                  <Option value="ADMIN">Administrador</Option>
                  <Option value="EDITOR">Editor</Option>
                  <Option value="VIEWER">Visualizador</Option>
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
    </ProtectedRoutes>
  );
};

export default CreateUser;
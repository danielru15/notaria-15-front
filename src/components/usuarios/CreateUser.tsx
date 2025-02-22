import { Button, Col, Form, Input, Row, Select } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { useFetchUsers } from "../../hooks/users/useAllUsers";
import { userCreateValidate } from "../../utils/userValidate"; // Asegúrate de tener esto para las validaciones
import { validateField } from "../../utils/validateFields";
import { UserAddOutlined } from "@ant-design/icons";
import { validatePassword } from "../../utils/profileUtils";
import ActionButtons from "../CardContainer/CardButton";

const { Option } = Select;

const CreateUser = () => {
  const [form] = Form.useForm();
  const { createUser} = useCreateUser();
  const { fetchUsers } = useFetchUsers();
  
  // enviamos los datos
  const handleSubmit = async (data:any) => {
    try {
      // Validar los datos con Zod
      userCreateValidate.parse(data);
      
      const success = await createUser(data);
      fetchUsers();
      
      if (success) form.resetFields();
    } catch (error) {
      console.error("Error al validar/enviar formulario:", error);
    }
  };

 

  return (
   
      
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <CardContainer title="CREAR USUARIOS">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  { required: true, message: "Ingrese el nombre" },
                  {
                    validator: (_, value) =>
                      validateField(userCreateValidate.shape.name, value),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="last_name"
                rules={[
                  { required: true, message: "Ingrese el apellido" },
                  {
                    validator: (_, value) =>
                      validateField(userCreateValidate.shape.last_name, value),
                  },
                ]}
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
                rules={[
                  { required: true, type: "email", message: "Ingrese un correo electrónico válido" },
                  {
                    validator: (_, value) =>
                      validateField(userCreateValidate.shape.email, value),
                  },
                ]}
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
                rules={[
                  { required: true, message: "Seleccione un cargo" },
                  {
                    validator: (_, value) =>
                      validateField(userCreateValidate.shape.cargo, value),
                  },
                ]}
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
                rules={[
                  { required: true, message: "Seleccione un rol" },
                  {
                    validator: (_, value) =>
                      validateField(userCreateValidate.shape.rol, value),
                  },
                ]}
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
          </CardContainer>
          <ActionButtons>
            <Button type="default" onClick={() => form.resetFields()}>Restablecer</Button>
            <Button type="primary" icon={<UserAddOutlined />} htmlType="submit">
              Agregar Usuario
            </Button>
          </ActionButtons>
        </Form>
  );
};

export default CreateUser;

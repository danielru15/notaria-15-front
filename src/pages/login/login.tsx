import { Button, Form, Input, Typography, Alert } from "antd";
import { useAuth } from "../../hooks/users/useAuth";
import { useState } from "react";
import { passwordSchema } from "../../utils/passWordValidate";

const { Title } = Typography;



const Login = () => {
  const { login, error } = useAuth();
  const [loading, setLoading] = useState(false);


  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    

    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
     
    } finally {
      setLoading(false);
    }
  };

  return (

    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Title level={2} style={{ marginBottom: "1.5rem", color: "#16A34A" }}>
        Bienvenido(a) al Sistema Notarial
      </Title>
        
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "1rem" }} />}
      <Form
        layout="vertical"
        style={{
          width: 400,
          padding: "2rem",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
        onFinish={onFinish}
      >


        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[{ required: true, message: "El correo es obligatorio" }]}
        >
          <Input type="email" placeholder="Ingresa tu correo" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "La contraseña es obligatoria" },
            () => ({
              validator(_, value) {
                const validation = passwordSchema.safeParse(value);
                if (!validation.success) {
                  return Promise.reject(validation.error.errors[0].message);
                }
                return Promise.resolve();
              },
            }),
          ]}
          
        >
          <Input.Password  placeholder="Ingresa tu contraseña" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="main-button"
            style={{ width: "100%" }}
            loading={loading}
          >
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

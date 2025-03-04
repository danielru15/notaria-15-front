import { Button, Card, Typography } from "antd";

const { Title } = Typography;

export const HomeCardUsers = () => {
  return (
    <Card
      title={<Title level={5}>Usuarios</Title>}
      extra={<Button type="primary">Gestionar</Button>}
    >
      <p>Accede a la gestión de usuarios.</p>
    </Card>
  );
};

import { Card, Typography } from "antd";

const { Title } = Typography;

export const HomeCardGraphics = () => {
  return (
    <Card title={<Title level={5}>Estadísticas</Title>} style={{ flex: 1 }}>
      <p>Gráficos sobre el estado de radicaciones.</p>
    </Card>
  );
};

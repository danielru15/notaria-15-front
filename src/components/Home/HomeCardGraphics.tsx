import { Card, Typography, Table } from "antd";

const { Title } = Typography;

const data = [
  {
    escritura: "12345",
    fecha: "12-03-2025",
    factura: {
      numero: "F001",
      valor: "$500.000",
      cliente: "Juan Pérez"
    }
  },
  {
    escritura: "12345",
    fecha: "13-03-2025",
    factura: {
      numero: "F002",
      valor: "$600.000",
      cliente: "Ana López"
    }
  },
  {
    escritura: "67890",
    fecha: "10-03-2025",
    factura: {
      numero: "F003",
      valor: "$750.000",
      cliente: "María González"
    }
  },
  {
    escritura: "67890",
    fecha: "11-03-2025",
    factura: {
      numero: "F004",
      valor: "$900.000",
      cliente: "Carlos Fernández"
    }
  },
  {
    escritura: "54321",
    fecha: "14-03-2025",
    factura: {
      numero: "F005",
      valor: "$1.200.000",
      cliente: "Laura Martínez"
    }
  },
  {
    escritura: "54321",
    fecha: "15-03-2025",
    factura: {
      numero: "F006",
      valor: "$850.000",
      cliente: "Pedro Ramírez"
    }
  }
];

const columns = [
  {
    title: "Número Escritura",
    dataIndex: "escritura",
    key: "escritura"
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    key: "fecha"
  },
  {
    title: "Número Factura",
    dataIndex: ["factura", "numero"],
    key: "facturaNumero"
  },
  {
    title: "Valor",
    dataIndex: ["factura", "valor"],
    key: "facturaValor"
  },
  {
    title: "Cliente",
    dataIndex: ["factura", "cliente"],
    key: "facturaCliente"
  }
];

export const HomeCardGraphics = () => {
  return (
    <Card title={<Title level={5}>Facturas Pendientes Por Cancelar</Title>} style={{ flex: 1 }}>
      <Table dataSource={data} columns={columns} rowKey="escritura" pagination={{ pageSize: 5 }} />
    </Card>
  );
};

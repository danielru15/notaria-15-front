import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table } from 'antd';

interface FacturaType {
  key: React.Key;
  numeroFactura: string;
  valor: number;
  estado: string;
}

interface EscrituraType {
  key: React.Key;
  escritura: string;
  fecha: string;
  totalFacturas: number;
  rentasRegistro: number;
  totalRYR: number;
  totalValorFacturas: number;
  metodoPagoRentas: string;
  metodoPagoRegistro: string;
  excedente: number;
  sobrante: number;
  totalGeneral: number;
}

const items = [
  { key: '1', label: 'Ver detalles' },
  { key: '2', label: 'Editar' },
];

const facturasData = Array.from({ length: 3 }).map<FacturaType>((_, i) => ({
  key: i.toString(),
  numeroFactura: `${i + 1}`,
  valor: 1000 * (i + 1),
  estado: i % 2 === 0 ? 'Pagado' : 'Pendiente',
}));

const escriturasData = Array.from({ length: 3 }).map<EscrituraType>((_, i) => ({
  key: i.toString(),
  escritura: `2024-${i + 1}`,
  fecha: '2024-02-22',
  totalFacturas: 3,
  rentasRegistro: 5000,
  totalRYR: 15000,
  totalValorFacturas: facturasData.reduce((sum, factura) => sum + factura.valor, 0),
  metodoPagoRentas: 'Transferencia',
  metodoPagoRegistro: 'Efectivo',
  excedente: 500,
  sobrante: 200,
  totalGeneral: 20700,
}));

const facturasColumns: TableColumnsType<FacturaType> = [
  { title: 'Número de Factura', dataIndex: 'numeroFactura', key: 'numeroFactura' },
  { title: 'Valor', dataIndex: 'valor', key: 'valor' },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    render: (estado) => (
      <Badge status={estado === 'Pagado' ? 'success' : 'warning'} text={estado} />
    ),
  },
  {
    title: 'Acciones',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a>Ver</a>
        <Dropdown menu={{ items }}>
          <a>
            Más <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

const escriturasColumns: TableColumnsType<EscrituraType> = [
  { title: 'Escritura', dataIndex: 'escritura', key: 'escritura' },
  { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
  { title: 'Total Facturas', dataIndex: 'totalFacturas', key: 'totalFacturas' },
  { title: 'Rentas Registro', dataIndex: 'rentasRegistro', key: 'rentasRegistro' },
  { title: 'Total RYR', dataIndex: 'totalRYR', key: 'totalRYR' },
  { title: 'Total Valor Facturas', dataIndex: 'totalValorFacturas', key: 'totalValorFacturas' },
  { title: 'Método Pago Rentas', dataIndex: 'metodoPagoRentas', key: 'metodoPagoRentas' },
  { title: 'Método Pago Registro', dataIndex: 'metodoPagoRegistro', key: 'metodoPagoRegistro' },
  { title: 'Excedente', dataIndex: 'excedente', key: 'excedente' },
  { title: 'Sobrante', dataIndex: 'sobrante', key: 'sobrante' },
  { title: 'Total General', dataIndex: 'totalGeneral', key: 'totalGeneral' },
];

const expandedRowRender = () => (
  <Table<FacturaType>
    columns={facturasColumns}
    dataSource={facturasData}
    pagination={false}
  />
);

const App: React.FC = () => (
  <Table<EscrituraType>
    columns={escriturasColumns}
    expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
    dataSource={escriturasData}
  />
);

export default App;
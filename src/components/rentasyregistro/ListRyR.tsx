import { Button, Space, Table, TableProps, Tag } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { useAllRentasYregistro } from "../../hooks/rentasyregistro/useAllRentasyRegistro";
import { EditOutlined, FilterFilled } from "@ant-design/icons";
import { formatCurrency, formatNumber } from "../../utils/FormatCurrency";
import { RentasYRegistroResponse } from "../../interfaces/rentasYregistro.interface";
import FacturasTable from "./FacturasTable";
import { useState } from "react";
import EditRentasRegistroDrawer from "./EditRentasyRegistro";


const ListRyR = () => {
  const { rentas_y_Registro } = useAllRentasYregistro();
    const [selectedRentasRegistro, setSelectedRentasRegistro] = useState<RentasYRegistroResponse | null>(null);


  const RentasYregistro_columns: TableProps<RentasYRegistroResponse>["columns"] = [
    {
      title: "Número de Escritura",
      dataIndex: "numero_escritura",
      key: "numero_escritura",
      filterSearch: true,
      onFilter: (value: any, record) =>
        record.numero_escritura.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(rentas_y_Registro.map(({ numero_escritura }) => numero_escritura.toLowerCase()))
      ).map((numero) => ({
        text: numero.toUpperCase(),
        value: numero,
      })),
      filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
      render: (value) =>
        isNaN(value) ? value : <span style={{ fontWeight: "bold" }}>{formatNumber(Number(value))}</span>,
      fixed: "left",
    },
    {
      title: "Protocolista",
      dataIndex: "nombre_completo",
      key: "nombre_completo",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.nombre_completo.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(rentas_y_Registro.map(({ nombre_completo }) => nombre_completo.toLowerCase()))
      ).map((nombre) => ({
        text: nombre.toUpperCase(),
        value: nombre,
      })),
      render: (name: string) => name.toUpperCase(),
      filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
      fixed: "left",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        new Date(record.fecha).toLocaleDateString().includes(value),
      filters: Array.from(
        new Set(rentas_y_Registro.map(({ fecha }) => new Date(fecha).toLocaleDateString()))
      ).map((fecha) => ({
        text: fecha,
        value: fecha,
      })),
      render: (fecha: string) => new Date(fecha).toLocaleDateString(),
      filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
    },
    {
      title: "Total Facturas Canceladas",
      dataIndex: "total_facturas_canceladas",
      key: "total_facturas_canceladas",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Total Facturas Sin Cancelar",
      dataIndex: "total_facturas_sin_cancelar",
      key: "total_facturas_sin_cancelar",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Rentas",
      dataIndex: "valor_rentas",
      key: "valor_rentas",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Método Pago Rentas",
      dataIndex: "metodo_pago_rentas",
      key: "metodo_pago_rentas",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.metodo_pago_rentas.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(rentas_y_Registro.map(({ metodo_pago_rentas }) => metodo_pago_rentas.toLowerCase()))
      ).map((metodo_pago_rentas) => ({
        text: metodo_pago_rentas.toUpperCase(),
        value: metodo_pago_rentas,
      })),
      filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
      render: (metodo_pago: string) => {
        const color = metodo_pago.toLowerCase() === "efectivo" ? "blue" : "green";
        return <Tag color={color}>{metodo_pago.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Registro",
      dataIndex: "valor_registro",
      key: "valor_registro",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Método Pago Registro",
      dataIndex: "metodo_pago_registro",
      key: "metodo_pago_registro",
      onFilter: (value: any, record: any) => record.metodo_pago_registro.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(rentas_y_Registro.map(({ metodo_pago_registro }) => metodo_pago_registro.toLowerCase()))
      ).map((metodo_pago_registro) => ({
        text: metodo_pago_registro.toUpperCase(),
        value: metodo_pago_registro,
      })),
      filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
      render: (metodo_pago: string) => {
        const color = metodo_pago.toLowerCase() === "efectivo" ? "blue" : "green";
        return <Tag color={color}>{metodo_pago.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Total RyR",
      dataIndex: "total_ryr",
      key: "total_ryr",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "devoluciones",
      dataIndex: "devoluciones",
      key: "devoluciones",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Excedentes",
      dataIndex: "excedentes",
      key: "excedentes",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Total Rentas y Registro",
      dataIndex: "total_rentasyregistro",
      key: "total_rentasyregistro",
      render: (value) => <span style={{ fontWeight: "bold" }}>{formatCurrency(value)}</span>,
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
    },
    {
      title: "Acciones",
      key: "acciones",
      fixed: "right",
      render: (_, record: RentasYRegistroResponse) => (
        <Space>
          <Button  icon={<EditOutlined />} onClick={() => setSelectedRentasRegistro(record)}>
            Editar
          </Button>
        
        </Space>
      ),
    },
];




  const expandedRowRender = (record: any) => {

  return (
   <FacturasTable id={record.id}/>
  );
};

  

  return (
    <CardContainer title="LISTA DE RENTAS Y REGISTRO">
      <Table
        columns={RentasYregistro_columns}
        expandable={{expandedRowClassName:'facturas-table', expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={rentas_y_Registro}
        scroll={{ x: "max-content" }}
        rowKey={(record) => record.id}
        bordered={true}  
        className="table-rentas-registro"
        pagination={{ pageSize: 4 }}
      />
      <EditRentasRegistroDrawer rentasRegistro={selectedRentasRegistro} onClose={() => setSelectedRentasRegistro(null)}  />
    </CardContainer>
  );
};

export default ListRyR;
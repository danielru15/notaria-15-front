import { Button, Table, TableProps, Dropdown, MenuProps } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import { useAuth } from "../../hooks/users/useAuth";
import { useAllCasosRentas } from "../../hooks/casoRentas/useAllCasosRentas";
import { EditOutlined, FilePdfOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditCasoRentasDrawer from "./EditCasoRentas";

const ListCasoRentas = () => {
  const { user } = useAuth();
  const { casosRentas } = useAllCasosRentas();
  const [selectedCasoRentas, setselectedCasoRentas] = useState<any>(null)



  const handleEdit = (record: CasoRentasResponse) => {
    setselectedCasoRentas(record)
  };


const getBoletaUrl = (radicado: string) => {
  return `https://mercurio.antioquia.gov.co/mercurio/servlet/ControllerMercurio?command=anexos&tipoOperacion=abrirLista&idDocumento=${radicado}&tipDocumento=R&now=${Date.now()}&ventanaEmergente=S&origen=NTR`;
};



  const columns: TableProps<CasoRentasResponse>["columns"] = [
    {
      title: "Número de Escritura",
      dataIndex: "numero_escritura",
      key: "numero_escritura",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.numero_escritura.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(casosRentas.map(({ numero_escritura }) => numero_escritura.toLowerCase()))
      ).map((numero) => ({
        text: numero.toUpperCase(),
        value: numero,
      })),
    },
    {
      title: "Nombre Protocolista",
      dataIndex: "name",
      key: "name",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(casosRentas.map(({ name }) => name.toLowerCase()))
      ).map((nombre) => ({
        text: nombre.toUpperCase(),
        value: nombre,
      })),
      render: (name: string) => name.toUpperCase()
    },
    {
      title: "Apellido Protocolista",
      dataIndex: "last_name",
      key: "last_name",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.last_name.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(casosRentas.map(({ last_name }) => last_name.toLowerCase()))
      ).map((apellido) => ({
        text: apellido.toUpperCase(),
        value: apellido,
      })),
      render: (last_name: string) => last_name.toUpperCase()
    },
    {
      title: "Email ",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Radicado",
      dataIndex: "radicado",
      key: "radicado",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.radicado.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(casosRentas.map(({ radicado }) => radicado.toLowerCase()))
      ).map((radicado) => ({
        text: radicado.toUpperCase(),
        value: radicado,
      })),
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.observaciones.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(casosRentas.map(({ observaciones }) => observaciones.toLowerCase()))
      ).map((observaciones) => ({
        text: observaciones.toUpperCase(),
        value: observaciones,
      })),
    },
    ...(user?.rol !== "VIEWER"
      ? [
          {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: CasoRentasResponse) => {
              
              const items: MenuProps["items"] = [
                {
                  key: "1",
                  icon:<EditOutlined />,
                  label: "Editar",
                  onClick:() => handleEdit(record)
                },
                {
                  key: "2",
                  icon:<FilePdfOutlined />,
                  label:  <a href={getBoletaUrl(record.radicado)} target="_blank" rel="noopener noreferrer">
                  Ver boleta en Mercurio
                </a>
                },
                {
                  key: "3",
                  icon:<MailOutlined />,
                  label: <span>Enviar correo</span>
                },
              ];
              return (
                
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                  <Button icon={<MoreOutlined />} onClick={(e) => e.preventDefault()}>More</Button>
                </Dropdown>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <CardContainer title="LISTA DE CASOS DE RENTA">
      <Table<CasoRentasResponse>
        columns={columns}
        dataSource={casosRentas}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content" }}
        pagination={{ defaultCurrent: 1, total: casosRentas.length, pageSize: 7 }}
      />
      <EditCasoRentasDrawer casoRenta={selectedCasoRentas}  onClose={() => setselectedCasoRentas(null)} />
    </CardContainer>
  );
};

export default ListCasoRentas;

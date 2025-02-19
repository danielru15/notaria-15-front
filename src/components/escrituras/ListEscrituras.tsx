import { useState } from "react";
import { Button, Table, TableProps } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { EscrituraResponse } from "../../interfaces/escrituras.interface";
import { useAuth } from "../../hooks/users/useAuth";
import EditEscrituraDrawer from "./EditEscrituras"; // Importa el Drawer de edición
import { useEscrituras } from "../../hooks/escrituras/useAllEscrituras";

const ListEscrituras = () => {
  const { user } = useAuth();
  const { escrituras } = useEscrituras()
  const [selectedEscritura, setSelectedEscritura] = useState<any>(null);
 
  const handleUpdate = (escritura:any) => {
    setSelectedEscritura(escritura);
   
  };

  const handleCloseDrawer = () => {
    setSelectedEscritura(null);
  };

  const columns: TableProps<EscrituraResponse>["columns"] = [
    {
      title: "Número de Escritura",
      dataIndex: "numero_de_escritura",
      key: "numero_de_escritura",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.numero_de_escritura.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(escrituras.map(({ numero_de_escritura }) => numero_de_escritura.toLowerCase()))
      ).map((numero) => ({
        text: numero.toUpperCase(),
        value: numero,
      })),
    },
    {
      title: "Fecha de Escritura",
      dataIndex: "fecha_de_escritura",
      key: "fecha_de_escritura",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        new Date(record.fecha_de_escritura).toLocaleDateString().includes(value),
      filters: Array.from(
        new Set(escrituras.map(({ fecha_de_escritura }) => new Date(fecha_de_escritura).toLocaleDateString()))
      ).map((fecha) => ({
        text: fecha,
        value: fecha,
      })),
      render: (fecha: string) => new Date(fecha).toLocaleDateString(),
    },
    {
      title: "Nombre protocolista",
      dataIndex: "nombre_usuario",
      key: "nombre_usuario",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.nombre_usuario.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(escrituras.map(({ nombre_usuario }) => nombre_usuario.toLowerCase()))
      ).map((nombre) => ({
        text: nombre.toUpperCase(),
        value: nombre,
      })),
    },
    {
      title: "Apellido Protocolista",
      dataIndex: "apellido_usuario",
      key: "apellido_usuario",
      filterSearch: true,
      onFilter: (value: any, record: any) =>
        record.apellido_usuario.toLowerCase().includes(value.toLowerCase()),
      filters: Array.from(
        new Set(escrituras.map(({ apellido_usuario }) => apellido_usuario.toLowerCase()))
      ).map((apellido) => ({
        text: apellido.toUpperCase(),
        value: apellido,
      })),
    },
    ...(user?.rol !== "VIEWER"
      ? [
          {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: any) => (
              <Button onClick={() => handleUpdate(record)}>Editar</Button>
            ),
          },
        ]
      : []),
  ];

  return (
    <CardContainer title="LISTA DE ESCRITURAS">
      <Table<EscrituraResponse> columns={columns} dataSource={escrituras} rowKey={(record) => record.escritura_id} />
      <EditEscrituraDrawer escritura={selectedEscritura} onClose={handleCloseDrawer} />
    </CardContainer>
  );
};

export default ListEscrituras;

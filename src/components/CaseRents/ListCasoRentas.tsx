import { Button, TableProps, Dropdown, MenuProps, Tag, notification } from "antd";
import CardContainer from "../CardContainer/CardContainer";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import { useAuth } from "../../hooks/users/useAuth";
import { useAllCasosRentas } from "../../hooks/casoRentas/useAllCasosRentas";
import { EditOutlined, FilePdfOutlined, FilterFilled, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditCasoRentasDrawer from "./EditCasoRentas";
import ReusableTable from "../Table/Table";
import { formatNumber } from "../../utils/FormatCurrency";
import { sendEmail } from "../../hooks/sendEmail/useSendEmail";
import dayjs from "dayjs";
import { getBoletaUrl } from "../../utils/rentasyregistroUtils";

const ListCasoRentas = () => {
  const { user } = useAuth();
  const { casosRentas } = useAllCasosRentas();
  const [selectedCasoRentas, setselectedCasoRentas] = useState<any>(null)
 ;


  const handleEdit = (record: CasoRentasResponse) => {
    setselectedCasoRentas(record)
  };





; 

const handleSendEmail = async (record: CasoRentasResponse) => {
  const attachments = record.pdf ? [String(record.pdf)] : ['hola'];
  const fecha = dayjs(record.fecha).format("DD-MM-YYYY")
  try {
    const emailData = {
      to: record.email,
      subject: "Boleta caso de rentas",
      templateFile: "boletaCasoRentas",
      templateData: {
        numero_escritura: record.numero_escritura,
        nombre: record.name,
        apellido: record.last_name,
        radicado: record.radicado,
        fecha,
      },
      attachments
    };

    await sendEmail(emailData);
    notification.success({
      message: "Correo enviado",
      description: `La boleta de rentas fue enviada correctamente a ${record.email}`,
    });

  } catch (error) {
    console.error("Error al enviar el correo:", error);

    notification.error({
      message: "Error al enviar",
      description: "No se pudo enviar la boleta de rentas. Intenta de nuevo más tarde.",
    });
  }
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
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
    render: (value) =>
      isNaN(value) ? value : <span style={{ fontWeight: "bold" }}>{formatNumber(Number(value))}</span>,
  },
  {
    title: "Nombre Protocolista",
    dataIndex: "name",
    key: "name",
    filterSearch: true,
    onFilter: (value: any, record: any) => record.name.toLowerCase().includes(value.toLowerCase()),
    filters: Array.from(new Set(casosRentas.map(({ name }) => name.toLowerCase()))).map((nombre) => ({
      text: nombre.toUpperCase(),
      value: nombre,
    })),
    render: (name: string) => name.toUpperCase(),
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
  },
  {
    title: "Apellido Protocolista",
    dataIndex: "last_name",
    key: "last_name",
    filterSearch: true,
    onFilter: (value: any, record: any) => record.last_name.toLowerCase().includes(value.toLowerCase()),
    filters: Array.from(new Set(casosRentas.map(({ last_name }) => last_name.toLowerCase()))).map(
      (apellido) => ({
        text: apellido.toUpperCase(),
        value: apellido,
      })
    ),
    render: (last_name: string) => last_name.toUpperCase(),
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    filterSearch: true,
    onFilter: (value: any, record: any) => record.estado.toLowerCase().includes(value.toLowerCase()),
    filters: Array.from(new Set(casosRentas.map(({ estado }) => estado.toLowerCase()))).map((estado) => ({
      text: estado.toUpperCase(),
      value: estado,
    })),
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
    render: (estado: string) => {
      const color = estado.toLowerCase() === "activo" ? "blue" : "green";
      return <Tag color={color}>{estado.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Radicado",
    dataIndex: "radicado",
    key: "radicado",
    filterSearch: true,
    onFilter: (value: any, record: any) => record.radicado.toLowerCase().includes(value.toLowerCase()),
    filters: Array.from(new Set(casosRentas.map(({ radicado }) => radicado.toLowerCase()))).map(
      (radicado) => ({
        text: radicado.toUpperCase(),
        value: radicado,
      })
    ),
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
    render: (value) => <span style={{ fontWeight: "bold" }}>{value}</span>,
  },
  {
    title: "Observaciones",
    dataIndex: "observaciones",
    key: "observaciones",
    filterSearch: true,
    onFilter: (value: any, record: any) =>
      record.observaciones.toLowerCase().includes(value.toLowerCase()),
    filters: Array.from(new Set(casosRentas.map(({ observaciones }) => observaciones.toLowerCase()))).map(
      (observaciones) => ({
        text: observaciones.toUpperCase(),
        value: observaciones,
      })
    ),
    filterIcon: (filtered: boolean) => <FilterFilled style={{ color: filtered ? "#ffffff" : "" }} />,
  },
  {
    title: "Acciones",
    key: "acciones",
    render: (_: any, record: CasoRentasResponse) => {
      const items: MenuProps["items"] = [
        ...(user?.rol !== "VIEWER"
          ? [
              {
                key: "1",
                icon: <EditOutlined />,
                label: "Editar",
                onClick: () => handleEdit(record),
              },
            ]
          : []),
        {
          key: "2",
          icon: <FilePdfOutlined />,
          label: (
            <a href={getBoletaUrl(record.radicado)} target="_blank" rel="noopener noreferrer">
              Ver boleta en Mercurio
            </a>
          ),
        },
        ...(record.pdf !== null
          ? [
              {
                key: "3",
                icon: <MailOutlined />,
                label: "Enviar correo",
                onClick: () => handleSendEmail(record),
              },
            ]
          : []),
      ];

      return (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
          <Button icon={<MoreOutlined />} onClick={(e) => e.preventDefault()}>
            More
          </Button>
        </Dropdown>
      );
    },
  },
];


  const rowClassName = (record: any) => {
    return record.estado === 'finalizado' ? 'active-row' : '';
  };

 
  return (
    <CardContainer title="LISTA DE CASOS DE RENTA" >
      <ReusableTable
      columns={columns}
      dataSource={casosRentas}
      rowClassName={rowClassName}
      />
      <EditCasoRentasDrawer casoRenta={selectedCasoRentas}  onClose={() => setselectedCasoRentas(null)} />
    </CardContainer>
    
  );
};

export default ListCasoRentas;

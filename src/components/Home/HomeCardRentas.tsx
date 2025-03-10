import { useEffect, useState } from "react";
import { Card, Button, Select, Tag} from "antd";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import ReusableTable from "../../components/Table/Table";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useDatos } from "../../context/DatosContext";
import { useFilteredUsers } from "../../hooks/users/useAllUsersCargo";
import { useAuth } from "../../hooks/users/useAuth";

const HomeCardRentas = () => {
    const {casosRentas} = useDatos()
    const [casos, setCasos] = useState<CasoRentasResponse[]>([]);
    const [filter, setFilter] = useState();
     const { user } = useAuth();
const { filteredUsers: protocolistas } = useFilteredUsers("Protocolista");

    useEffect(() => {
        if (filter === '' ) {
            setCasos(casosRentas);
        } else {
            setCasos(casosRentas.filter((caso) => caso.user_id === user?.id));
        }
    }, [casosRentas, user?.id]);

    const columns = [
        {
            title: "Número Escritura",
            dataIndex: "numero_escritura",
            key: "numeroEscritura",
        }
        ,
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            filters: [
                { text: "Activos", value: "activo" },
                { text: "Finalizados", value: "finalizado" },
            ],
            onFilter: (value:any, record:any) => record.estado === value,
            render: (estado:any) => (
                <Tag color={estado === "activo" ? "green" : "red"}>{estado.toUpperCase()}</Tag>
            ),
        },
        {
            title: "Radicado",
            dataIndex: "radicado",
            key: "radicado",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_:any, record:any) => (
                <div>
                    <Button type="link" href={`/caso-rentas/${record.radicado}`} icon={<EyeOutlined />}>Ver</Button>
                    <Button type="link" href={`/caso-rentas/editar/${record.radicado}`} icon={<EditOutlined />}>Editar</Button>
                </div>
            ),
        },
    ];

    return (
        <Card title="Casos de Rentas" extra={<Button href="/caso-rentas">Ver Más</Button>}>
           <Select onChange={setFilter} style={{ width: "100%", marginBottom: 10 }}
                            showSearch
                            placeholder="Seleccione un usuario"
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                              (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                            }
                            options={protocolistas.map(user => ({
                              value: user.id,
                              label: `${user.name.toUpperCase()} ${user.last_name.toUpperCase()}`,
                            }))}
                          />
            
                <ReusableTable dataSource={casos} columns={columns} rowKey={(record:any) => record.radicado} pagination={{ pageSize: 5 }} />
            
        </Card>
    );
};

export default HomeCardRentas;
import React, { useEffect, useState } from "react";
import { Card, Button, Select, Tag, Spin } from "antd";
import { useAllCasosRentas } from "../../hooks/casoRentas/useAllCasosRentas";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import ReusableTable from "../../components/Table/Table";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const HomeCardRentas = () => {
    const { casosRentas, loading, fetchCasoRentas } = useAllCasosRentas();
    const [casos, setCasos] = useState<CasoRentasResponse[]>([]);
    const [filter, setFilter] = useState("todos");

    useEffect(() => {
        fetchCasoRentas();
    }, [fetchCasoRentas]);

    useEffect(() => {
        if (filter === "todos") {
            setCasos(casosRentas);
        } else {
            setCasos(casosRentas.filter((caso) => caso.estado === filter));
        }
    }, [casosRentas, filter]);

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
            onFilter: (value, record) => record.estado === value,
            render: (estado) => (
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
            render: (_, record) => (
                <div>
                    <Button type="link" href={`/caso-rentas/${record.radicado}`} icon={<EyeOutlined />}>Ver</Button>
                    <Button type="link" href={`/caso-rentas/editar/${record.radicado}`} icon={<EditOutlined />}>Editar</Button>
                </div>
            ),
        },
    ];

    return (
        <Card title="Casos de Rentas" extra={<Button href="/caso-rentas">Ver Más</Button>}>
            <Select defaultValue="todos" onChange={setFilter} style={{ width: "100%", marginBottom: 10 }}>
                <Select.Option value="todos">Todos</Select.Option>
                <Select.Option value="activo">Activos</Select.Option>
                <Select.Option value="finalizado">Finalizados</Select.Option>
            </Select>
            {loading ? (
                <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
            ) : (
                <ReusableTable dataSource={casos.slice(0, 10)} columns={columns} rowKey={(record) => record.radicado} pagination={{ pageSize: 5 }} />
            )}
        </Card>
    );
};

export default HomeCardRentas;
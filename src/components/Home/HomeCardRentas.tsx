import { useEffect, useState } from "react";
import { Card, Button, Tag, Select } from "antd";
import ReusableTable from "../../components/Table/Table";
import {  FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/users/useAuth";
import { getBoletaUrl } from "../../utils/rentasyregistroUtils";
import { useAllCasosRentas } from "../../hooks/casoRentas/useAllCasosRentas";
import { descargarInforme } from "../../utils/excel.util";
import dayjs from "dayjs";
import { formatNumber } from "../../utils/FormatCurrency";

const { Option } = Select;

const HomeCardRentas = () => {
    type FilteredCaso = {
        numero_escritura: string;
        estado: string;
        radicado: string;
    };

    const [filteredCasos, setFilteredCasos] = useState<FilteredCaso[]>([]);
    const [filter, setFilter] = useState<string | null>(null);
    const { casosRentas } = useAllCasosRentas();
    const { user } = useAuth();
    const fechaActual = dayjs().format("DD-MM-YYYY");

    useEffect(() => {
        if (casosRentas.length && user) {
            let casosFiltrados = casosRentas.filter(caso => caso.user_id === user.id);
            if (filter) {
                casosFiltrados = casosFiltrados.filter(caso => caso.estado === filter);
            }
            setFilteredCasos(
                casosFiltrados.map(({ numero_escritura, estado, radicado }) => ({
                    numero_escritura,
                    estado,
                    radicado
                }))
            );
        }
    }, [casosRentas, user?.id, filter]);

    const columns = [
        {
            title: "Número Escritura",
            dataIndex: "numero_escritura",
            key: "numeroEscritura",
             render: (value:string) => formatNumber(Number(value))
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (estado: any) => (
                <Tag color={estado === "activo" ? "green" : "red"}>
                    {estado.toUpperCase()}
                </Tag>
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
            render: (_: any, record: any) => (
                <Button
                
                    href={getBoletaUrl(record.radicado)}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<FilePdfOutlined />}
                >
                    Ver
                </Button>
            ),
        },
    ];

    return (
        <Card 
            title="Casos de Rentas" 
            extra={
                <div style={{ display: "flex", gap: "10px" }}>
                    <Select
                        placeholder="Filtrar por estado"
                        onChange={(value) => setFilter(value)}
                        allowClear
                        style={{ width: 150 }}
                    >
                        <Option value="activo">Activos</Option>
                        <Option value="finalizado">Finalizados</Option>
                    </Select>
                    <Button type="primary"  icon={<FileExcelOutlined />} onClick={() => descargarInforme(fechaActual, filteredCasos)}>
                        Descargar Informe
                    </Button>
                </div>
            }
        >
            <ReusableTable 
                dataSource={filteredCasos} 
                columns={columns} 
                rowKey={(record: any) => record.radicado} 
                pagination={{ pageSize: 5 }} 
            />
        </Card>
    );
};

export default HomeCardRentas;

import { useState } from "react";
import { Table, DatePicker, Card, DatePickerProps, Space, Typography, Button } from "antd";
import { useAllRentasYregistro } from "../../hooks/rentasyregistro/useAllRentasyRegistro";
import { RentasYRegistroResponse } from "../../interfaces/rentasYregistro.interface";
import { formatCurrency, formatNumber } from "../../utils/FormatCurrency";
import { descargarInforme } from "../../utils/excel.util";
import { FileExcelOutlined } from "@ant-design/icons";


const { Text } = Typography;

const TotalRegistro = () => {
    const { rentas_y_Registro } = useAllRentasYregistro();
    const [fechaFiltro, setFechaFiltro] = useState<any>("");

    const agruparValoresRegistro = (data: RentasYRegistroResponse[], fechaFiltro: string) => {
        const agrupado = data
            .filter(({ fecha }) => fecha.split("T")[0] === fechaFiltro) // Filtrar por fecha seleccionada
            .reduce((acc, caso) => {
                const { nombre_completo, numero_escritura, valor_registro } = caso;
    
                if (!acc[nombre_completo]) {
                    acc[nombre_completo] = [];
                }
    
                acc[nombre_completo].push({ escritura: numero_escritura, registro: valor_registro });
    
                return acc;
            }, {} as Record<string, { escritura: string; registro: number }[]>);
    
        return Object.entries(agrupado).flatMap(([protocolista, registros]) =>
            registros.map(({ escritura, registro }) => ({
                Protocolista: protocolista, 
                Escritura: escritura, 
                Total: registro
            }))
        );
    };
    
    
    const datosTabla = agruparValoresRegistro(rentas_y_Registro, fechaFiltro);

    const columns = [
        {
            title: "Protocolista",
            dataIndex: "Protocolista",
            key: "Protocolista",
            render: (value: string) => value.toUpperCase(),
        },
        {
            title: "Número de Escritura",
            dataIndex: "Escritura",
            key: "Escritura",
            render: (value:string) => formatNumber(Number(value))
        },
        {
            title: "Valor Registro",
            dataIndex: "Total",
            key: "Total",
            render: (value: number) => formatCurrency(value),
        },
    ];
    

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        if (dateString) {
            setFechaFiltro(dateString);
        }
    };

   

    return (
        <Card title="Total Registro por Protocolista" extra={ <Button type="primary" icon={<FileExcelOutlined />} onClick={() => descargarInforme(fechaFiltro, datosTabla)}>
        Descargar Informe Registro
    </Button>}>
            <Space direction="horizontal" size="middle" style={{ width: "100%", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                <Space>
                    <Text strong>Seleccione una fecha para filtrar:</Text>
                    <DatePicker onChange={onChange} needConfirm />
                </Space>
               
            </Space>
            <Table
                dataSource={datosTabla}
                columns={columns}
                rowKey={(record) => record.Escritura}
                pagination={false}
                bordered={true}  
            />
        </Card>
    );
};

export default TotalRegistro;

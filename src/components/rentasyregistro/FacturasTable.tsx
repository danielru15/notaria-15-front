import { Table, TableProps, Tag, Button, Form, Input, Space, Select } from 'antd';
import { Facturas } from '../../interfaces/facturas.interface';
import { formatCurrency, formatNumber } from '../../utils/FormatCurrency';
import { notaria15Api } from '../../api/notaria.api';
import { useEffect, useState } from 'react';
import { useEditFacturas } from '../../hooks/facturas/useEditFacturas';
import { EditOutlined } from '@ant-design/icons';
import { useAllRentasYregistro } from '../../hooks/rentasyregistro/useAllRentasyRegistro';

const TablaFacturas = ({ id }: { id: number }) => {
  const [facturas, setFacturas] = useState<Facturas[]>([]);
  const [claveEditando, setClaveEditando] = useState<number | null>(null);
  const [formulario] = Form.useForm();
  const { editFacturas } = useEditFacturas();
 const { fetchRentas_y_Registro } = useAllRentasYregistro();
  // Obtener las facturas desde la API
  const obtenerFacturas = async () => {
    try {
      const { data } = await notaria15Api.get<Facturas[]>(`/facturas/get/${id}`);
      setFacturas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerFacturas();
  }, [id]);

  // Verificar si el registro está en modo edición
  const estaEditando = (registro: Facturas) => registro.id === claveEditando;

  // Iniciar la edición de un registro
  const editar = (registro: Facturas) => {
    formulario.setFieldsValue({
      numero_factura: registro.numero_factura,
      valor: registro.valor,
      estado: registro.estado,
    });
    setClaveEditando(registro.id);
  };

  // Cancelar la edición
  const cancelar = () => {
    setClaveEditando(null);
  };

  // Guardar los cambios
  const guardar = async (id: number) => {
    try {
      const fila = await formulario.validateFields();

      const succes = await editFacturas(id, fila)

      if(succes) {
        await obtenerFacturas ()
        await fetchRentas_y_Registro()
      }
      setClaveEditando(null);
 
    } catch (errorInfo) {
      console.log('Error de validación:', errorInfo);
    }
  };

  const columnasFacturas: TableProps<Facturas>['columns'] = [
    { key: 'clave', dataIndex: 'rentasyregistro_id' },
    {
      title: 'Número de Factura',
      dataIndex: 'numero_factura',
      key: 'numero_factura',
      render: (valor: any) => {
        return isNaN(valor) ? valor : <span style={{ fontWeight: 'bold' }}>{formatNumber(Number(valor))}</span>;
      },
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number, registro: Facturas) => {
        if (estaEditando(registro)) {
          return (
            <Form.Item name="valor" style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          );
        }
        return <span style={{ fontWeight: 'bold' }}>{formatCurrency(valor)}</span>;
      },
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado: string, registro: Facturas) => {
        if (estaEditando(registro)) {
          return (
            <Form.Item name="estado" style={{ margin: 0, width:200 }}>
              <Select>
                <Select.Option value="sin cancelar">Sin Cancelar</Select.Option>
                <Select.Option value="cancelado">Cancelado</Select.Option>
              </Select>
            </Form.Item>
          );
        }
        const color = estado.toLowerCase() === 'sin cancelar' ? 'red' : 'green';
        return <Tag color={color}>{estado.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, registro: Facturas) => {
        const editable = estaEditando(registro);
        return editable ? (
          <Space>
            <Button type="primary" onClick={() => guardar(registro.id)}>
              Guardar
            </Button>
            <Button variant="solid" onClick={cancelar}>
              Cancelar
            </Button>
          </Space>
        ) : (
          <Button variant='solid' icon={<EditOutlined />} onClick={() => editar(registro)}>
            Editar
          </Button>
        );
      },
    },
];


  return (
    <Form form={formulario} component={false}>
      <Table<Facturas>
        columns={columnasFacturas}
        pagination={false}
        dataSource={facturas}
        rowKey={(registro) => registro.id}
       
      />
    </Form>
  );
};

export default TablaFacturas;
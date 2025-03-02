import { Table, TableProps, Tag, Button, Form, Input, InputNumber } from 'antd';
import { Facturas } from '../../interfaces/facturas.interface';
import { formatCurrency, formatNumber } from '../../utils/FormatCurrency';
import { notaria15Api } from '../../api/notaria.api';
import { useEffect, useState } from 'react';

const TablaFacturas = ({ id }: { id: number }) => {
  const [facturas, setFacturas] = useState<Facturas[]>([]);
  const [claveEditando, setClaveEditando] = useState<number | null>(null);
  const [formulario] = Form.useForm();

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
      const nuevosDatos = [...facturas];
      const indice = nuevosDatos.findIndex((item) => id === item.id);
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
      render: (valor: any, registro: Facturas) => {
        if (estaEditando(registro)) {
          return (
            <Form.Item name="numero_factura" style={{ margin: 0 }}>
              <Input placeholder="Ingrese número de factura" />
            </Form.Item>
          );
        }
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
              <InputNumber formatter={(valor) => formatCurrency(Number(valor) || 0)} />
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
            <Form.Item name="estado" style={{ margin: 0 }}>
              <Input placeholder="Ingrese estado" />
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
          <>
            <Button type="link" onClick={() => guardar(registro.id)}>
              Guardar
            </Button>
            <Button type="link" onClick={cancelar}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button type="link" onClick={() => editar(registro)}>
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
        onRow={(registro) => ({
          onClick: () => {
            // Opcional: Agregar comportamiento adicional al hacer clic en la fila
          },
        })}
      />
    </Form>
  );
};

export default TablaFacturas;
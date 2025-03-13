import { Form, Input, DatePicker, Select, Button, Space, Row, Col, Card, InputNumber } from 'antd';
import { useState } from 'react';
import { FileAddOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ActionButtons from '../CardContainer/CardButton';
import { useEscrituras } from '../../hooks/escrituras/useAllEscrituras';
import { useCreateRentasRegistro } from '../../hooks/rentasyregistro/useCreateRentasyRegistro';
import dayjs from 'dayjs';
import { useAllRentasYregistro } from '../../hooks/rentasyregistro/useAllRentasyRegistro';

const RentasYRegistroForm = () => {
const { escrituras } = useEscrituras()
  const [form] = Form.useForm();
  const [facturas, setFacturas] = useState([{ key: Date.now() }]);
  const {createRentasRegistro } = useCreateRentasRegistro()
   const { fetchRentas_y_Registro } = useAllRentasYregistro();
  const addFactura = () => {
    setFacturas([...facturas, { key: Date.now() }]);
  };

  const removeFactura = (key: any) => {
    setFacturas(facturas.filter((factura) => factura.key !== key));
  };

  const handleSubmit = async (data: any) => {
    const facturasArray = facturas.map(({ key }) => ({
      numero_factura: data[key]?.numero_factura ,
      valor: Number(data[key]?.valor),
      estado: data[key]?.estado,
    }));
  
    const formattedData = {
        escritura_id: data.escritura_id,
        valor_rentas: Number(data.valor_rentas),
        metodo_pago_rentas: data.metodo_pago_rentas,
        valor_registro: Number(data.valor_registro),
        metodo_pago_registro: data.metodo_pago_registro,
        fecha: dayjs(data.fecha).format("YYYY-MM-DD"),
        devoluciones: Number(data.devoluciones),
        excedentes: Number(data.excedentes),
        facturas: facturasArray,
      };
      
    const success = await createRentasRegistro(formattedData)

  
    if(success) {
        form.resetFields();
        await fetchRentas_y_Registro()
    }
  };
  

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="DATOS DE LA ESCRITURA">
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                label="Escritura"
                name="escritura_id"
                rules={[{ required: true, message: "Seleccione una escritura" }]}
            >
                <Select
                    showSearch
                    placeholder="Seleccione una escritura"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                        (option?.label as string)?.toLowerCase().includes(input.toLowerCase())}
                        options={escrituras.map(escrituras => ({
                        value: escrituras.escritura_id,
                        label: `${escrituras.numero_de_escritura} - ${dayjs(escrituras.fecha_de_escritura).format("DD-MM-YYYY")} --> ${escrituras.nombre_usuario.toUpperCase()} ${escrituras.apellido_usuario.toUpperCase()}`,
                    }))}
                            />
            </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fecha"
                name="fecha"
                rules={[{ required: true, message: "Seleccione la fecha" }]}
              >
                <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="PAGOS">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Valor Rentas"
                name="valor_rentas"
                rules={[{ required: true, message: "Ingrese el valor de rentas" }]}
              >
                <Input placeholder="Ej: 5638300" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Método de Pago Rentas"
                name="metodo_pago_rentas"
                rules={[{ required: true, message: "Seleccione método de pago" }]}
              >
                <Select placeholder="Método">
                  <Select.Option value="pse">PSE</Select.Option>
                  <Select.Option value="efectivo">Efectivo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Valor Registro" name="valor_registro" rules={[{ required: true, message: "Ingrese el valor de registro" }]}> 
                <Input placeholder="Ej: 6482300" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Método de Pago Registro" name="metodo_pago_registro" rules={[{ required: true, message: "Seleccione método de pago" }]}> 
                <Select placeholder="Método">
                  <Select.Option value="pse">PSE</Select.Option>
                  <Select.Option value="efectivo">Efectivo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="OTROS DATOS">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Devoluciones" name="devoluciones" rules={[{ required: true, message: "Ingrese devoluciones" }]}> 
                <Input placeholder="Ej: 0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Excedentes" name="excedentes" rules={[{ required: true, message: "Ingrese excedentes" }]}> 
                <Input placeholder="Ej: 14200" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Observaciones" name="observaciones" rules={[{ required: true, message: "Ingrese observaciones" }]}> 
                <Input.TextArea placeholder="Detalles adicionales" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="FACTURAS">
          {facturas.map(({ key }) => (
            <Row key={key} gutter={16} align="middle">
              <Col span={5}>
                <Form.Item
                  name={[key, 'numero_factura']}
                  label="Número de Factura"
                  rules={[{ required: true, message: "Ingrese el número de factura" }]}
                >
                  <Input placeholder="Ej: 309191" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name={[key, 'valor']}
                  label="Valor"
                  rules={[{ required: true, message: "Ingrese el valor" }]}
                >
                  <Input placeholder="Ej: 9173450" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name={[key, 'estado']}
                  label="Estado"
                  rules={[{ required: true, message: "Seleccione estado" }]}
                >
                  <Select>
                    <Select.Option value="cancelado">Cancelado</Select.Option>
                    <Select.Option value="pendiente">Pendiente</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button type="text" icon={<MinusCircleOutlined />} onClick={() => removeFactura(key)} />
              </Col>
            </Row>
          ))}
          <Button type="dashed" onClick={addFactura} block icon={<PlusOutlined />}>Añadir Factura</Button>
        </Card>
      </Space>
      <ActionButtons>
        <Button type="default" onClick={() => form.resetFields()}>Restablecer</Button>
        <Button type="primary" icon={<FileAddOutlined />} htmlType="submit">Crear Registro</Button>
      </ActionButtons>
    </Form>
  );
};

export default RentasYRegistroForm;
import { Form, Input, DatePicker, Select, Button, Space, Row, Col, Card } from 'antd';
import { useState } from 'react';
import { FileAddOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ActionButtons from '../CardContainer/CardButton';

const RentasYRegistroForm = () => {
  const [form] = Form.useForm();
  const [facturas, setFacturas] = useState([{ key: Date.now() }]);

  const addFactura = () => {
    setFacturas([...facturas, { key: Date.now() }]);
  };

  const removeFactura = (key:any) => {
    setFacturas(facturas.filter((factura) => factura.key !== key));
  };

  return (
    <Form form={form} layout="vertical">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="DATOS DE LA ESCRITURA">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Escritura ID" name="escritura_id" rules={[{ required: true, message: "Ingrese el ID de la escritura" }]}> 
                <Input placeholder="Ej: 19" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Fecha" name="fecha" rules={[{ required: true, message: "Seleccione la fecha" }]}> 
                <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        
<Card title="PAGOS">
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Form.Item label="Valor Rentas" name="valor_rentas" rules={[{ required: true, message: "Ingrese el valor de rentas" }]}>
        <Input placeholder="Ej: 5638300" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Método de Pago Rentas" name="metodo_pago_rentas" rules={[{ required: true, message: "Seleccione método de pago" }]}>
        <Select placeholder="Método">
          <Select.Option value="pse">PSE</Select.Option>
          <Select.Option value="efectivo">Efectivo</Select.Option>
        </Select>
      </Form.Item>
    </Col>
  </Row>
  
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Form.Item label="Valor Registro" name="valor_registro">
        <Input placeholder="Ej: 6482300" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Método de Pago Registro" name="metodo_pago_registro">
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
              <Form.Item label="Devoluciones" name="devoluciones"> 
                <Input placeholder="Ej: 0" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Excedentes" name="excedentes"> 
                <Input placeholder="Ej: 14200" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="Observaciones" name="observaciones"> 
                <Input.TextArea placeholder="Detalles adicionales" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        
        <Card title="FACTURAS">
          {facturas.map(({ key }) => (
            <Row key={key} gutter={16} align="middle">
              <Col span={8}>
                <Form.Item name={[key, 'numero_factura']} label="Número de Factura" rules={[{ required: true, message: "Ingrese el número de factura" }]}> 
                  <Input placeholder="Ej: 309191" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={[key, 'valor']} label="Valor" rules={[{ required: true, message: "Ingrese el valor" }]}> 
                  <Input placeholder="Ej: 9173450" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name={[key, 'estado']} label="Estado" rules={[{ required: true, message: "Seleccione estado" }]}> 
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
        <Button type="primary" className="button-animate" icon={<FileAddOutlined />}>Crear Registro</Button>
      </ActionButtons>
    </Form>
  );
};

export default RentasYRegistroForm;
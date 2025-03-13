import { Form, Input, Button, Card, Space, Row, Col } from 'antd';
import { useState } from 'react';
import { FileAddOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ActionButtons from '../CardContainer/CardButton';  

const ClienteRegistroForm = () => {
  const [form] = Form.useForm();

  
  const [clientes, setClientes] = useState([{ key: Date.now() }]);

  const addCliente = () => {
    setClientes([...clientes, { key: Date.now() }]);
  };

  const removeCliente = (key:any) => {
    setClientes(clientes.filter((cliente) => cliente.key !== key));
  };

  return (
    <Form form={form} layout="vertical">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        
        <Card title="REGISTRO DE CLIENTES">
          {clientes.map(({ key }) => (
            <Row key={key} gutter={16} align="middle">
              <Col span={12}>
                <Form.Item 
                  name={[key, 'nombre_cliente']} 
                  label="Nombre Cliente" 
                  rules={[{ required: true, message: "Ingrese el nombre del cliente" }]}
                >
                  <Input placeholder="Ej: Juan Pérez" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name={[key, 'nif']} 
                  label="NIF" 
                  rules={[{ required: true, message: "Ingrese el NIF del cliente" }]}
                >
                  <Input placeholder="Ej: 12345678X" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button 
                  type="text" 
                  icon={<MinusCircleOutlined />} 
                  onClick={() => removeCliente(key)} 
                />
              </Col>
            </Row>
          ))}
          
          <Button 
            type="dashed" 
            onClick={addCliente} 
            block 
            icon={<PlusOutlined />}
          >
            Añadir Cliente
          </Button>
        </Card>

        <ActionButtons>
          <Button type="default" onClick={() => form.resetFields()}>Restablecer</Button>
          <Button type="primary" className="button-animate" icon={<FileAddOutlined />}>Crear Cliente</Button>
        </ActionButtons>
        
      </Space>
    </Form>
  );
};

export default ClienteRegistroForm;

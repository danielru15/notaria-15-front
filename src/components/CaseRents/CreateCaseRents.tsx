import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import CardContainer from '../CardContainer/CardContainer';


const CreateCaseRents = () => {
  return (
    <CardContainer title='CREAR CASO RENTAS'>
    <Form
                  layout="vertical"
                  
                 
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Fecha"
                        name="creation_date"
                       
                        rules={[{ required: true, message: "Seleccione una fecha" }]}
                      >
                        <DatePicker style={{ width: "100%" }} disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Fecha del Documento"
                        name="document_date"
                        rules={[{ required: true, message: "Seleccione la fecha del documento" }]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Escritura"
                        name="escritura"
                        rules={[{ required: true, message: "Ingrese el número de escritura" }]}
                      >
                        <Input placeholder="Ej: 12345" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Radicado"
                        name="radicado"
                        rules={[{ required: true, message: "Ingrese el radicado" }]}
                      >
                        <Input placeholder="Ej: 20240101234432" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Protocolista"
                        name="protocolista"
                        rules={[{ required: true, message: "Seleccione un protocolista" }]}
                      >
                        <Select placeholder="Seleccione un protocolista"  />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Observaciones" name="observaciones">
                        <Input.TextArea placeholder="Observaciones adicionales (opcional)" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                  <Button className="button-animate" type="primary" icon={<AppstoreAddOutlined />} htmlType="submit">
                      Agregar Caso
                    </Button>
                  </Form.Item>
                </Form>
            </CardContainer>
  )
}

export default CreateCaseRents
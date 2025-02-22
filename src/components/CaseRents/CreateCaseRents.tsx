import { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Modal, Space } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import CardContainer from '../CardContainer/CardContainer';
import { casoRentasSchema } from '../../utils/casoRentasValidate';
import { useCreateCasoRentas } from "../../hooks/casoRentas/useCreateCasoRentas";
import { validateField } from '../../utils/validateFields';
import { useFilteredUsers } from '../../hooks/users/useAllUsersCargo';
import { useAllCasosRentas } from '../../hooks/casoRentas/useAllCasosRentas';
import dayjs from 'dayjs';
import ActionButtons from '../CardContainer/CardButton';




const CreateCaseRents = () => {
  const [form] = Form.useForm();
  const { createCasoRentas } = useCreateCasoRentas();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false); 
  const { filteredUsers: protocolistas } = useFilteredUsers("Protocolista");
  const { fetchCasoRentas } = useAllCasosRentas();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const casoData = {
        user_id: values.user_id,
        numero_escritura: values.numero_escritura,
        fecha: dayjs(values.fecha).format("YYYY-MM-DD"),
        radicado: values.radicado,
        observaciones: values.observaciones || "",
      };

      // Validar los datos con Zod
      casoRentasSchema.parse(casoData);

      // Iniciar el estado de loading
      setConfirmLoading(true);

      // Enviar los datos a la API
       await createCasoRentas(casoData);
     
   
        fetchCasoRentas()
        form.resetFields();
      
      // Cerrar el modal después de que la operación asíncrona se complete
      
    } catch (error) {
      console.error("Error al validar/enviar formulario:", error);
    } finally {
      setIsModalVisible(false);
      setConfirmLoading(false);

    }
  };

  return (
    <>
    <Form form={form} layout="vertical" >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <CardContainer title='CREACIÓN DE ESCRITURA'>
          <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                      label="Protocolista"
                      name="user_id"
                      rules={[
                        { required: true, message: "Seleccione un usuario" },
                        {
                                validator: (_, value) =>
                                  validateField(casoRentasSchema.shape.user_id, value),
                        }
                      ]}
                        >
                          <Select
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
                        </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Escritura"
                    name="numero_escritura"
                    rules={[
                      { required: true, message: "Ingrese el número de escritura" },
                      {
                        validator: (_, value) =>
                          validateField(casoRentasSchema.shape.numero_escritura, value),
                      },
                    ]}
                  >
                    <Input placeholder="Ej: 12345" />
                  </Form.Item>
                </Col>
          </Row>
          <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Fecha de la Escritura"
                    name="fecha"
                    rules={[
                      { required: true, message: "Seleccione la fecha del documento" },
                      {
                        validator: (_, value) =>
                          validateField(casoRentasSchema.shape.fecha, dayjs(value).format("YYYY-MM-DD")),
                      },
                    ]}
                  >
                    <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
          </Row>
        </CardContainer>
        <CardContainer title='CREACION CASO DE RENTAS'>
        <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Radicado"
                  name="radicado"
                  rules={[
                    { required: true, message: "Ingrese el radicado" },
                    {
                      validator: (_, value) =>
                        validateField(casoRentasSchema.shape.radicado, value),
                    },
                  ]}
                >
                  <Input placeholder="Ej: 20240101234432" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Observaciones"
                  name="observaciones"
                  rules={[
                    {
                      validator: (_, value) =>
                        validateField(casoRentasSchema.shape.observaciones, value),
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Observaciones adicionales (opcional)" />
                </Form.Item>
              </Col>
            </Row>
        </CardContainer>

      </Space>
        <ActionButtons>
          <Button type="default" onClick={() => form.resetFields()}>Restablecer</Button>
          <Button
            className="button-animate"
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Crear Caso Rentas
          </Button>
        </ActionButtons>
      </Form>

      <Modal
        title="Confirmar Creación de Caso"
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Sí"
        cancelText="No"
        confirmLoading={confirmLoading}
      >
        <p>¿Seguro que los datos son correctos ?, una vez creado el caso no se podra revertir </p>
      </Modal>
    </>
  );
};

export default CreateCaseRents;
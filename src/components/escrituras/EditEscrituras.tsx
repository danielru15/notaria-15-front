import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, DatePicker } from "antd";
import { EscrituraResponse } from "../../interfaces/escrituras.interface";
import { useEditEscritura } from "../../hooks/escrituras/useEditEscritura";
import { useEscrituras } from "../../hooks/escrituras/useAllEscrituras";
import dayjs from "dayjs";
import { useFilteredUsers } from "../../hooks/users/useAllUsersCargo";


interface EditEscrituraDrawerProps {
  escritura: EscrituraResponse | null;
  onClose: () => void;
}

const EditEscrituraDrawer: React.FC<EditEscrituraDrawerProps> = ({ escritura, onClose }) => {
  const [form] = Form.useForm();
  const { editEscritura } = useEditEscritura();
  const { fetchEscrituras } = useEscrituras();
  const { filteredUsers: protocolistas } = useFilteredUsers("Protocolista");


  useEffect(() => {
    if (escritura) {
      form.setFieldsValue({
        numero_de_escritura: escritura.numero_de_escritura,
        usuario_id: escritura.usuario_id,
        fecha_de_escritura: escritura.fecha_de_escritura ? dayjs(escritura.fecha_de_escritura) : null,
      });
    } else {
      form.resetFields();
    }
  }, [escritura, form]);

  const handleSave = async () => {
    try {
      // Verificar que escritura no sea null antes de usar sus propiedades
      if (!escritura) return;
      
      const values = await form.validateFields();
      
      const updatedEscritura = {
        numero_escritura: values.numero_de_escritura,
        user_id: values.usuario_id,
        fecha: values.fecha_de_escritura.format("YYYY-MM-DD"),
      };
     

      // Llamamos al hook usando la propiedad escritura_id de forma segura
      await editEscritura(escritura.escritura_id, updatedEscritura);
       fetchEscrituras()

      onClose();
    } catch (error) {
      console.error("Error al actualizar escritura:", error);
    }
  };

  return (
    <Drawer
      title="Editar Escritura"
      width={720}
      onClose={onClose}
      open={!!escritura}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="numero_de_escritura"
              label="Número de Escritura"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="usuario_id"
              label="Protocolista"
              rules={[{ required: true, message: "Campo requerido" }]}
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fecha_de_escritura"
              label="Fecha de Escritura"
              rules={[{ required: true, message: "Campo requerido" }]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditEscrituraDrawer;

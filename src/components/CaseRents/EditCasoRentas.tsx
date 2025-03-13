import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, DatePicker, Divider, Select, Modal } from "antd";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import { useAllCasosRentas } from "../../hooks/casoRentas/useAllCasosRentas";
import { useFilteredUsers } from "../../hooks/users/useAllUsersCargo";
import { useEditCasoRenta } from "../../hooks/casoRentas/useEditCasoRentas";
import { useForm } from "antd/es/form/Form";
import { casoRentasSchema } from "../../utils/casoRentasValidate"; // Asumiendo que ya tienes el esquema de Zod
import { validateField } from "../../utils/validateFields";
import dayjs from "dayjs";
import { ExclamationCircleFilled } from "@ant-design/icons";

const CONFIRMATION_WORD = "ACTUALIZAR";

interface EditCasoRentasDrawerProps {
  casoRenta: CasoRentasResponse | null;
  onClose: () => void;
}

const EditCasoRentasDrawer: React.FC<EditCasoRentasDrawerProps> = ({ casoRenta, onClose }) => {
  const [form] = useForm();
  const { fetchCasoRentas } = useAllCasosRentas();
  const { editCasoRenta } = useEditCasoRenta();
  const { filteredUsers: protocolistas } = useFilteredUsers("Protocolista");



  useEffect(() => {
    if (casoRenta) {
      form.setFieldsValue({
        numero_escritura: casoRenta.numero_escritura,
        radicado: casoRenta.radicado,
        user_id: casoRenta.user_id,
        observaciones: casoRenta.observaciones,
        fecha: casoRenta.fecha ? dayjs(casoRenta.fecha) : null,
      });
    } else {
      form.resetFields();
    }
  }, [casoRenta, form]);

  const handleSave = async () => {
  
      let inputValue = "";
      let modalInstance: any = null;
    // Mostrar el modal para confirmar la acción
    modalInstance = Modal.confirm({
      title: "Confirmar Actualización",
      icon: <ExclamationCircleFilled />,
      okText: "Actualizar",
      cancelText: "Cancelar",
      okType: "danger",
      okButtonProps: { disabled: true },
       content: (
              <>
                <p>
                  Para eliminar este usuario, escribe la palabra <b>{CONFIRMATION_WORD}</b> en el siguiente campo:
                </p>
                <br />
                <Input
                  onChange={(e) => {
                    inputValue = e.target.value.trim();
                    modalInstance.update({
                      okButtonProps: { disabled: inputValue !== CONFIRMATION_WORD },
                    });
                  }}
                />
              </>
            ),
            
            
      onOk: async () => {
        if (inputValue === CONFIRMATION_WORD) {
        try {
          if (!casoRenta) return;

          const values = await form.validateFields();

          const casoData = {
            numero_escritura: values.numero_escritura,
            user_id: values.user_id,
            radicado: values.radicado,
            observaciones: values.observaciones,
            fecha: values.fecha.format("YYYY-MM-DD"),
            escritura_id: casoRenta.escritura_id,
            confirmText: CONFIRMATION_WORD,
          };

          const success = await editCasoRenta(casoRenta.id, casoData, inputValue);

          if (success) {
            fetchCasoRentas();
            onClose();
          }
        } catch (error) {
          console.error("Error al actualizar caso de renta:", error);
        }
      }

    }
    });
  };

  return (
    <Drawer
      title="Editar Caso de Renta"
      width={800}
      onClose={onClose}
      open={!!casoRenta} // Abre el drawer si casoRenta no es null
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
        <Divider orientation="left">Escrituración</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="numero_escritura"
              label="Número de Escritura"
              rules={[
                { required: true, message: "Campo requerido" },
                { validator: (_, value) => validateField(casoRentasSchema.shape.numero_escritura, value) },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="user_id"
              label="Protocolista"
              rules={[
                { required: true, message: "Campo requerido" },
                { validator: (_, value) => validateField(casoRentasSchema.shape.user_id, value) },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione un usuario"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                }
                options={protocolistas.map((user) => ({
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
              name="fecha"
              label="Fecha"
              rules={[
                { required: true, message: "Campo requerido" },
                { validator: (_, value) => validateField(casoRentasSchema.shape.fecha, dayjs(value).format("YYYY-MM-DD")) },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Caso de Renta</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="radicado"
              label="Radicado"
              rules={[
                { required: true, message: "Campo requerido" },
                { validator: (_, value) => validateField(casoRentasSchema.shape.radicado, value) },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="observaciones" label="Observaciones">
              <Input.TextArea rows={2}  />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditCasoRentasDrawer;

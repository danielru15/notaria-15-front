import React, { useEffect } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space, DatePicker, Modal } from "antd";
import { RentasYRegistroResponse } from "../../interfaces/rentasYregistro.interface";
import dayjs from "dayjs";
import { useAllRentasYregistro } from "../../hooks/rentasyregistro/useAllRentasyRegistro";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useEditRentasyRegistro } from "../../hooks/rentasyregistro/useEditRentasRegistro";
import { formatCurrency } from "../../utils/FormatCurrency";

interface EditRentasRegistroDrawerProps {
  rentasRegistro: RentasYRegistroResponse | null;
  onClose: () => void;
}


const EditRentasRegistroDrawer: React.FC<EditRentasRegistroDrawerProps> = ({ rentasRegistro, onClose }) => {
  const [form] = Form.useForm();
  const { fetchRentas_y_Registro } = useAllRentasYregistro();
  const {editRentasyRegistro } =useEditRentasyRegistro() 

  useEffect(() => {
    if (rentasRegistro) {
      form.setFieldsValue({
        ...rentasRegistro,
        fecha: dayjs(rentasRegistro.fecha),
      });
    } else {
      form.resetFields();
    }
  }, [rentasRegistro, form]);
;

  if (!rentasRegistro) return null;



  const handleSave = async () => {
  
    let modalInstance: any = null;
  // Mostrar el modal para confirmar la acción
  modalInstance = Modal.confirm({
    title: "Confirmar Actualización",
    icon: <ExclamationCircleFilled />,
    okText: "Actualizar",
    cancelText: "Cancelar",
    okType: "danger",
     content: (
            <>
              <p>
                esta seguro que desea actualizar?
              </p>
              <br />
            </>
          ),
          
          
    onOk: async () => {
      try {
 

        const values = await form.validateFields();

        const RentasyRegistroData = {
          valor_rentas: values.valor_rentas,
          metodo_pago_rentas: values.metodo_pago_rentas,
          valor_registro: values.valor_registro,
          metodo_pago_registro: values.metodo_pago_registro,
          devoluciones: values.devoluciones,
          excedentes: values.excedentes,
          observaciones: values.observaciones
        }

        console.log(RentasyRegistroData)
        const success = await editRentasyRegistro(rentasRegistro.id, RentasyRegistroData)

        if (success) {
          await fetchRentas_y_Registro()
          onClose();
        }
      } catch (error) {
        console.error("Error al actualizar caso de renta:", error);
      }
    }

  }
  )};


  return (
    <Drawer
      title="Editar Rentas y Registro"
      width={720}
      onClose={onClose}
      open={!!rentasRegistro}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={handleSave}>Guardar</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="numero_escritura" label="Número de Escritura">
        <Input disabled />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="nombre_completo" label="Protocolista">
        <Input disabled />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="fecha" label="Fecha">
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} disabled />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="metodo_pago_rentas" label="Método Pago Rentas">
        <Select disabled>
          <Select.Option value="efectivo">Efectivo</Select.Option>
          <Select.Option value="pse">PSE</Select.Option>
        </Select>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="valor_rentas" label="Valor Rentas">
        <Input disabled value={formatCurrency(form.getFieldValue("valor_rentas"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="metodo_pago_registro" label="Método Pago Registro">
        <Select>
          <Select.Option value="efectivo">Efectivo</Select.Option>
          <Select.Option value="pse">PSE</Select.Option>
        </Select>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="valor_registro" label="Valor Registro">
        <Input value={formatCurrency(form.getFieldValue("valor_registro"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="total_facturas_canceladas" label="Total Facturas Canceladas">
        <Input disabled value={formatCurrency(form.getFieldValue("total_facturas_canceladas"))} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="total_facturas_sin_cancelar" label="Total Facturas Sin Cancelar">
        <Input disabled value={formatCurrency(form.getFieldValue("total_facturas_sin_cancelar"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item name="total_ryr" label="Total RyR">
        <Input disabled value={formatCurrency(form.getFieldValue("total_ryr"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item name="excedentes" label="Excedentes">
        <Input value={formatCurrency(form.getFieldValue("excedentes"))} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name="devoluciones" label="Devoluciones">
        <Input value={formatCurrency(form.getFieldValue("devoluciones"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item name="total_rentasyregistro" label="Total Rentas y Registro">
        <Input disabled value={formatCurrency(form.getFieldValue("total_rentasyregistro"))} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item name="observaciones" label="Observaciones">
        <Input.TextArea rows={2} />
      </Form.Item>
    </Col>
  </Row>
</Form>

    </Drawer>
  );
};

export default EditRentasRegistroDrawer;
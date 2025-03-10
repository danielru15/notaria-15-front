import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { Facturas } from "../../interfaces/facturas.interface";


export const useEditFacturas = () => {
  const editFacturas = async (facturaId: number, facturaData: Facturas) => {
    try {
      const { data } = await notaria15Api.put(`/facturas/updated/${facturaId}`, facturaData);

      notification.success({
        message: "Factura Actualizada",
        description: `se ha actualizado la factura`,
        placement: "topRight",
      });

      return data;
    } catch (error: any) {
      console.error("Error al actualizar la factura:", error);
      if (error.response) {
        notification.error({
          message: "Error en los datos",
          description: error.response.data?.error || "Ocurrió un error en la actualización.",
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Error de conexión",
          description: "No se pudo conectar con el servidor. Verifique su red.",
          placement: "topRight",
        });
      }
      return null;
    }
  };

  return { editFacturas };
};

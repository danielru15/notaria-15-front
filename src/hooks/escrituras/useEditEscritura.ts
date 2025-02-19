import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { Escritura } from "../../interfaces/escrituras.interface";

export const useEditEscritura = () => {
  const editEscritura = async (escrituraId: number, escrituraData: Escritura) => {
    try {
      const { data } = await notaria15Api.put(`/escrituras/${escrituraId}`, escrituraData);

      notification.success({
        message: "Escritura Actualizada",
        description: "La escritura ha sido actualizada exitosamente.",
        placement: "topRight",
      });

      return data;
    } catch (error: any) {
      console.error("Error al actualizar escritura:", error);
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

  return { editEscritura };
};

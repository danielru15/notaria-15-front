import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { RentasYRegistro } from "../../interfaces/rentasYregistro.interface";


export const useEditRentasyRegistro = () => {
  const editRentasyRegistro = async (rentas_y_registroId: number, rentasRegistroData: RentasYRegistro) => {
    try {
      const { data } = await notaria15Api.put(`/rentas_y_registro/updated/${rentas_y_registroId}`, rentasRegistroData);

      notification.success({
        message: "RENTAS Y REGISTRO ACTUALIZADO",
        description: `se ha actualizado rentas y registro`,
        placement: "topRight",
      });

      return data;
    } catch (error: any) {
      console.error("Error al actualizar rentas y registro:", error);
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

  return { editRentasyRegistro};
};

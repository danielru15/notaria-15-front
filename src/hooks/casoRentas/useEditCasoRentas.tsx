import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { CasoRentas } from "../../interfaces/casoRentas.interface";

export const useEditCasoRenta = () => {
  const editCasoRenta = async (casoRentaId: number, casoRentaDatos: CasoRentas,confirmText:string ) => {
   
    try {
      const { data } = await notaria15Api.put(`/caso-rentas/update-caso-rentas/${casoRentaId}`,  {
        ...casoRentaDatos,
        confirmText, // Enviamos la palabra de confirmación
      });

      notification.success({
        message: "Caso de rentas Actualizado",
        description: "El caso de rentas ha sido actualizado exitosamente.",
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

  return { editCasoRenta };
};

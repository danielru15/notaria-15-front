import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { CasoRentas } from "../../interfaces/casoRentas.interface";



export const useCreateCasoRentas = () => {
  const createCasoRentas = async (casoData: CasoRentas) => {
    try {
      const { data } = await notaria15Api.post("/caso-rentas/crear-caso-rentas", casoData);
      notification.success({
        message: "Caso de Rentas Creado",
        description: "El caso de rentas ha sido registrado exitosamente.",
        placement: "topRight",
      });
      return data;
    } catch (error:any) {
      if (error.response) {
        const { status,data } = error.response;
        if (status) {
          notification.error({
            message: "Error en los datos",
            description: data?.error,
            placement: "topRight",
          });
        }
      } else {
        notification.error({
          message: "Error de conexión",
          description: "No se pudo conectar con el servidor. Verifique su red.",
          placement: "topRight",
        });
      }
      console.error("Error al crear caso de rentas:", error);

  
      return null;
    }
  };

  return { createCasoRentas };
};

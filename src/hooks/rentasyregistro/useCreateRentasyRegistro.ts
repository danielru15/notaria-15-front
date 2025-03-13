import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { RentasYRegistro } from "../../interfaces/rentasYregistro.interface";



export const useCreateRentasRegistro = () => {
  const createRentasRegistro = async (RentasRegistroCreate: RentasYRegistro) => {
    try {
      const { data } = await notaria15Api.post("/rentas_y_registro/crear", RentasRegistroCreate);
      notification.success({
        message: "Rentas y Registro Creado con exito",
        description: "El caso de rentas y registo ha sido registrado exitosamente.",
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

  return { createRentasRegistro };
};

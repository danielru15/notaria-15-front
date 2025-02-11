import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { User } from "../../interfaces/user.interface";



export const useCreateUser = () => {
  const createUser = async (userData: User) => {
    try {
      const { data } = await notaria15Api.post("/users/register", userData);
      notification.success({
        message: "Usuario Creado",
        description: "El usuario ha sido creado exitosamente.",
        placement: "topRight",
      });
      return data;
    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      console.log(error)
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
      return null;
    }
  };

  return { createUser };
};

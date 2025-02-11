import { notification } from "antd";
import { notaria15Api } from "../../api/notaria.api";
import { User } from "../../interfaces/user.interface";

export const useEditUser = () => {
  const editUser = async (userId: number, userData: Partial<Pick<User, "cargo" | "rol">>, currentUser: User) => {
    try {
      // Asegurar que si no se cambia un valor, se envía el actual
      const updatedData = {
        cargo: userData.cargo ?? currentUser.cargo,
        rol: userData.rol ?? currentUser.rol,
        email:currentUser.email
      };
  

      const { data } = await notaria15Api.patch(`/users/${userId}`, updatedData);

      notification.success({
        message: "Usuario Actualizado",
        description: "El usuario ha sido actualizado exitosamente.",
        placement: "topRight",
      });

      return data;
    } catch (error: any) {
      console.error("Error al actualizar usuario:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status) {
          notification.error({
            message: "Error en los datos",
            description: data?.error || "Ocurrió un error en la actualización.",
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

  return { editUser };
};

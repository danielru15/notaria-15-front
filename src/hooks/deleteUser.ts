import { notaria15Api } from "../api/notaria.api";
import { notification } from "antd";

export const useDeleteUser = () => {
  const deleteUser = async (id: number, confirmText:string) => {
    try {
      await notaria15Api.delete(`/users/${id}`, {
        data: { confirmText }, // Se envía la palabra clave en el body
      })

      // Notificación de éxito
      notification.success({
        message: "Usuario eliminado",
        description: "El usuario ha sido eliminado exitosamente.",
        placement: "topRight",
      });

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ;

      notification.error({
        message: "Error al eliminar usuario",
        description: error.response
          ? errorMessage
          : "No se pudo conectar con el servidor. Verifique su red.",
        placement: "topRight",
      });
    }
  };

  return { deleteUser };
};

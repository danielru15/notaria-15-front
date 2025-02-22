import { passwordSchema } from "./passWordValidate";


// Función para obtener la primera letra del primer nombre
export const getInitial = (name?: string) => {
    return name?.trim().split(" ")[0][0].toUpperCase() || null;
  };

    // Función para generar un color único basado en el email
export const getColorFromEmail = (email: string | any) => {
      const colors = ["#FF5733", "#33A1FF", "#33FF57", "#FFC300", "#A833FF"];
      const index = email ? email.charCodeAt(0) % colors.length : 0;
      return colors[index];
    };

export  const capitalizeFirstLetter = (str: string | undefined) => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

 // Función para validar la contraseña en tiempo real
 export const validatePassword = ( _:any,value: string) => {
  const result = passwordSchema.safeParse(value);
  if (!result.success) {
    return Promise.reject(result.error.errors[0].message);
  }
  return Promise.resolve();
};
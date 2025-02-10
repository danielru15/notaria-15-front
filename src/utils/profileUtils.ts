// Función para obtener la primera letra del primer nombre
export const getInitial = (name: string) => {
    return name?.trim().split(" ")[0][0].toUpperCase() || "?";
  };

    // Función para generar un color único basado en el email
export const getColorFromEmail = (email: string | any) => {
      const colors = ["#FF5733", "#33A1FF", "#33FF57", "#FFC300", "#A833FF"];
      const index = email ? email.charCodeAt(0) % colors.length : 0;
      return colors[index];
    };
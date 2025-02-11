export interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string; 
    rol: "ADMIN" | "EDITOR" | "VIEWER"; // Ajusta según los roles disponibles
    cargo: string;
    created_at?: string; // Fecha en formato ISO
    observations?: string;
  }
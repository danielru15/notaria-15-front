import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { notaria15Api } from "../api/notaria.api";
import { Button, notification } from "antd";

// Definir los tipos para el usuario y el contexto de autenticación
interface User {
  complete_name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error?: string | null;
}
// Mostrar notificación de sesión por expirar con botón de confirmación
const closeNotification = () => {
  notification.destroy();
};
// Crear el contexto de autenticación
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Verifica autenticación y token al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await notaria15Api.get("/users/profile");
        setUser({ complete_name: `${data.user.name} ${data.user.last_name}` });

        // Gestionar expiración del token
        manageTokenExpiration(data.token);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Función para manejar la expiración del token
const manageTokenExpiration = (token: string) => {
  if (!token) return;

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
    const expirationTime = tokenPayload.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const warningTime = 5 * 60 * 1000; // 5 minutos antes de expirar

    if (timeUntilExpiration > warningTime) {
      // Mostrar notificación 5 minutos antes de expirar
      setTimeout(() => {
        notification.warning({
          message: "Sesión por expirar",
          description: "Tu sesión expirará en 5 minutos. Guarda tu trabajo y vuelve a iniciar sesión.",
          duration: 0, // Mantener la notificación hasta que el usuario la cierre
          btn: (
            <Button type="primary" size="small" onClick={closeNotification}>
              OK
            </Button>
          ),
        });
      }, timeUntilExpiration - warningTime);
    }

    // Cerrar sesión automáticamente cuando expire
    setTimeout(() => {
      logout();
    }, timeUntilExpiration);
  } catch (error) {
    console.error("Error al manejar la expiración del token:", error);
  }
};

  // Redirigir al login si no hay usuario autenticado
  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const { data } = await notaria15Api.post("/users/login", { email, password });
      setUser({ complete_name: `${data.user.name} ${data.user.last_name}` });
      console.log(data)
      // Manejar expiración del token
      manageTokenExpiration(data.token);

      navigate("/usuarios", { replace: true });
    } catch {
      setError("No se pudo iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await notaria15Api.post("/users/logout");
      setUser(null);
      navigate("/login", { replace: true });
    } catch {
      console.error("Error al cerrar sesión");
    }
  };

  // Mostrar carga hasta que se verifique la autenticación
  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

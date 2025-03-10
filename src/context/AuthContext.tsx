import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { notaria15Api } from "../api/notaria.api";
import { Button, notification } from "antd";
import { User } from "../interfaces/user.interface";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error?: string | null;
  Allusers: User[];
  setAllUsers: (users: User[]) => void;
  passwordChanged?: boolean;
  setPasswordChanged: (boolean:boolean) => void
}

const closeNotification = () => {
  notification.destroy();
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordChanged , setPasswordChanged ] = useState<boolean>(false);
  const [Allusers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      if (user) {
        navigate("/home", { replace: true });
      }
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const { data } = await notaria15Api.get("/users/profile");
        if (!data?.user) {
          logout();
          return;
        }
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Recuperar expiración del token almacenado en localStorage
        const storedExpirationTime = localStorage.getItem("tokenExpirationTime");
        if (storedExpirationTime) {
          manageTokenExpiration(parseInt(storedExpirationTime, 10));
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const manageTokenExpiration = (expirationTime: number) => {
    const warningTime = 5 * 60 * 1000;
    const timeUntilExpiration = expirationTime - Date.now();

    if (timeUntilExpiration > warningTime) {
      setTimeout(() => {
        notification.warning({
          message: "Sesión por expirar",
          description: "Tu sesión expirará en 5 minutos. Guarda tu trabajo.",
          duration: 0,
          btn: <Button type="primary" size="small" onClick={closeNotification}>OK</Button>,
        });
      }, timeUntilExpiration - warningTime);
    }

    setTimeout(logout, timeUntilExpiration);
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const { data } = await notaria15Api.post("/users/login", { email, password });
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Extraemos la expiración del token y la guardamos en localStorage
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      const expirationTime = tokenPayload.exp * 1000;
      localStorage.setItem("tokenExpirationTime", expirationTime.toString());

   

      navigate("/home", { replace: true });
    } catch {
      setError("No se pudo iniciar sesión. Verifica tus credenciales.");
    }
  };

  const logout = async () => {
    try {
      await notaria15Api.post("/users/logout");
    } catch {
      console.error("Error al cerrar sesión");
    }
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpirationTime");
    navigate("/login", { replace: true });
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error, Allusers, setAllUsers, passwordChanged , setPasswordChanged }}>
      {children}
    </AuthContext.Provider>
  );
};

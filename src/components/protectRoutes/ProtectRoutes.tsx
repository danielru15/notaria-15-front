import { ReactNode } from "react";
import { useAuth } from "../../hooks/users/useAuth";

// Definir un tipo con los valores permitidos
type UserRole = "ADMIN" | "EDITOR" | "VIEWER";

interface ProtectedRoutesProps {
  children: ReactNode;
  roles: UserRole[]; // Ahora acepta un array de roles
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children, roles }) => {
  const { user } = useAuth();

  // Verificar si el usuario tiene al menos uno de los roles permitidos
  if (!user || !roles.includes(user.rol)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;

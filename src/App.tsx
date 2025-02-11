import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import CaseRentesPage from "./pages/caserentes/CaseRentesPage";
import CaseFinished from "./pages/caserentes/CaseFinished";
import Login from "./pages/login/login";
import { useAuth } from "./hooks/users/useAuth";
import "./index.css";
const App = () => {
  const {  loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#16A34A",
          colorPrimaryHover: "#16A34A",
        },
        components: {
          Layout: {
            headerBg: "#14532D",
            triggerBg: "#D1FAE5",
            triggerColor: "#065F46",
          },
          Tabs: {
            inkBarColor: "#34D399",
            itemActiveColor: "#34D399",
            itemSelectedColor: "#10B981",
            itemHoverColor: "#059669",
          },
          Input: {
            borderRadius: 4,
            colorBgContainer: "#FFFFFF",
            colorBgTextHover: "#D1FAE5",
          },
          Button: {
            borderRadius: 4,
            colorPrimaryBg: "#16A34A",
            colorPrimaryHover: "#34D399",
          },
          Dropdown: {
            colorBgContainer: "#F0FFF4",
            colorBgTextHover: "#D1FAE5",
          },
        },
      }}
    >
      <Routes>
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/caso-rentas" element={<CaseRentesPage />} />
        <Route path="/caso-rentas-finalizados" element={<CaseFinished />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;

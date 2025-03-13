import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import CaseRentesPage from "./pages/caserentes/CaseRentesPage";
import Login from "./pages/login/login";
import { useAuth } from "./hooks/users/useAuth";
import "./index.css";
import RentasyRegistro from "./pages/rentasyregistro/RentasyRegistro";
import { Home } from "./pages/home/Home";
import Clientes from "./pages/clientes/Clientes";

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
            controlItemBgHover:"#D1FAE5",
          },
          Table: {
            headerBg:"#16A34A",
            headerColor:"white",
            rowHoverBg:"#D1FAE5",
            borderColor:"#afafaf",
            cellFontSize:14,
            headerBorderRadius:0,
          
          },
          Menu: {
            colorBgContainer: "#1a1c1a",
            colorBgTextHover: "#D1FAE5",
            itemActiveBg:"#16A34A",
            itemBorderRadius:0,
            
          },
          Pagination: {
            itemActiveBg: "#34d399c3", 
            itemSize: 36, 
            colorBgTextHover: "#D1FAE5", 
            itemBg:'#D1FAE5'
          }
        },
      }}
    >
      <Routes>
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/caso-rentas" element={<CaseRentesPage />} />
        <Route path="/rentas-y-registro" element={<RentasyRegistro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;

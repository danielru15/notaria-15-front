// index.tsx (o main.tsx dependiendo de tu estructura)
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DatosProvider } from "./context/DatosContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <DatosProvider>
          <App />
        </DatosProvider> 
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

import { createContext, useContext, useState} from "react";
import { EscrituraResponse } from "../interfaces/escrituras.interface";
import { CasoRentasResponse } from "../interfaces/casoRentas.interface";

interface DatosContextType {
    escrituras: EscrituraResponse[];
    setEscrituras: (escrituras: EscrituraResponse[]) => void;
    casosRentas:CasoRentasResponse[]
    setCasosRentas: (casosRentas:CasoRentasResponse[]) => void
}

const DatosContext = createContext<DatosContextType | undefined>(undefined);

export const DatosProvider = ({ children }: { children: React.ReactNode }) => {
  const [escrituras, setEscrituras] = useState<EscrituraResponse[]>([]);
  const [casosRentas, setCasosRentas] = useState<CasoRentasResponse[]> ([]);

    return (
        <DatosContext.Provider value={{escrituras, setEscrituras, casosRentas, setCasosRentas }}>
            {children}
        </DatosContext.Provider>
    );
};

export const useDatos = () => {
    const context = useContext(DatosContext);
    if (!context) {
        throw new Error("useDatos debe usarse dentro de un DatosProvider");
    }
    return context;
};

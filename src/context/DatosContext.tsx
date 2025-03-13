import { createContext, useContext, useState} from "react";
import { EscrituraResponse } from "../interfaces/escrituras.interface";
import { CasoRentasResponse } from "../interfaces/casoRentas.interface";
import { RentasYRegistroResponse } from "../interfaces/rentasYregistro.interface";
import { Facturas } from "../interfaces/facturas.interface";

interface DatosContextType {
    escrituras: EscrituraResponse[];
    setEscrituras: (escrituras: EscrituraResponse[]) => void
    casosRentas:CasoRentasResponse[]
    setCasosRentas: (casosRentas:CasoRentasResponse[]) => void
    rentas_y_Registro:RentasYRegistroResponse[]
    setRentas_y_Registro: (rentas_y_Registro:RentasYRegistroResponse[]) => void
    facturas:Facturas[], 
    setFacturas: (facturas:Facturas[]) => void,
    casosRentasFilter:CasoRentasResponse[],
     setCasosRentasFilter:(casosRentasFilter:CasoRentasResponse[]) => void
}

const DatosContext = createContext<DatosContextType | undefined>(undefined);

export const DatosProvider = ({ children }: { children: React.ReactNode }) => {
    const [casosRentas, setCasosRentas] = useState<CasoRentasResponse[]> ([]);
    const [rentas_y_Registro, setRentas_y_Registro] = useState<RentasYRegistroResponse[]> ([]);
    const [escrituras, setEscrituras] = useState<EscrituraResponse[]>([]);
    const [facturas, setFacturas] = useState<Facturas[]>([]);
    const [casosRentasFilter, setCasosRentasFilter] = useState<CasoRentasResponse[]>([]);
    return (
        <DatosContext.Provider value={{escrituras, setEscrituras, casosRentas, setCasosRentas, rentas_y_Registro, setRentas_y_Registro, facturas, setFacturas , casosRentasFilter, setCasosRentasFilter}}>
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

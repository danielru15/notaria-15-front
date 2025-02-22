import { useState, useEffect, useCallback } from "react";
import { CasoRentasResponse } from "../../interfaces/casoRentas.interface";
import { notaria15Api } from "../../api/notaria.api";
import { useDatos } from "../../context/DatosContext";

export const useAllCasosRentas = (estado: string = "activo") => {
    const { casosRentas, setCasosRentas } = useDatos();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCasoRentas = useCallback(async () => {
        try {
            const { data } = await notaria15Api.get<CasoRentasResponse[]>(`/caso-rentas/`);
           
            setCasosRentas(data);
        } catch (err: any) {
            console.error("Error al cargar los casos de renta:", err);
            setError("Error al cargar los casos de renta");
        } finally {
            setLoading(false); // Termina la carga
        }
    }, [estado, setCasosRentas]);

    useEffect(() => {
        fetchCasoRentas();
    }, [fetchCasoRentas]);

    return { casosRentas, loading, error, fetchCasoRentas };
};

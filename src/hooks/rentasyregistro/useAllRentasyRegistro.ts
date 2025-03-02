import { useState, useEffect, useCallback } from "react";
import { notaria15Api } from "../../api/notaria.api";
import { useDatos } from "../../context/DatosContext";
import { RentasYRegistroResponse } from "../../interfaces/rentasYregistro.interface";

export const useAllRentasYregistro = () => {
     const { rentas_y_Registro, setRentas_y_Registro } = useDatos();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRentas_y_Registro = useCallback(async () => {
        try {
          const { data } = await notaria15Api.get<RentasYRegistroResponse[]>("/rentas_y_registro/get");
          setRentas_y_Registro(data);
        } catch (err: any) {
          setError("Error al cargar rentas y registro");
        } finally {
          setLoading(false);
        }
      }, [setRentas_y_Registro]); 

    useEffect(() => {
        fetchRentas_y_Registro();
    }, [fetchRentas_y_Registro]);

    return { rentas_y_Registro, loading, error, fetchRentas_y_Registro };
};

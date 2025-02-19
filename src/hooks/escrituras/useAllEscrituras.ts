import { useState, useEffect, useCallback } from "react";
import { EscrituraResponse } from "../../interfaces/escrituras.interface";
import { notaria15Api } from "../../api/notaria.api";
import { useDatos } from "../../context/DatosContext";

export const useEscrituras = () => {
     const { escrituras, setEscrituras } = useDatos();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEscrituras = useCallback(async () => {
        try {
          const { data } = await notaria15Api.get<EscrituraResponse[]>("/escrituras");
          setEscrituras(data);
        } catch (err: any) {
          setError("Error al cargar las escrituras");
        } finally {
          setLoading(false);
        }
      }, [setEscrituras]); 

    useEffect(() => {
        fetchEscrituras();
    }, [fetchEscrituras]);

    return { escrituras, loading, error, fetchEscrituras };
};

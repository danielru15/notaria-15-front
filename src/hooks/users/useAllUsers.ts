import { useState, useEffect, useCallback } from "react";
import { notaria15Api } from "../../api/notaria.api";
import { User } from "../../interfaces/user.interface";
import { useAuth } from "./useAuth";

export const useFetchUsers = () => {
  const { Allusers, setAllUsers } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await notaria15Api.get<User[]>("/users");
      setAllUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  }, [setAllUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { Allusers, loading, error, fetchUsers }; // 🔹 Retorna `fetchUsers`
};

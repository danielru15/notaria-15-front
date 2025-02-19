import { useMemo } from "react";
import { useFetchUsers } from "./useAllUsers";

export const useFilteredUsers = (cargo: string) => {
  const { Allusers } = useFetchUsers();

  const filteredUsers = useMemo(() => {
    return Allusers.filter((user) => user.cargo?.toLowerCase() === cargo.toLowerCase());
  }, [Allusers, cargo]);

  return { filteredUsers };
};

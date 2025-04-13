import { createContext, useContext } from "react";

type User = {
  name: string;
  email: string;
  picture?: string;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

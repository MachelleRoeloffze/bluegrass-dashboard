"use client";
import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";


export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

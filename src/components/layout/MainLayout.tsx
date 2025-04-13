// components/layout/MainLayout.tsx
"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "@supabase/supabase-js";
import { UserContext } from "@/context/UserContext";

type Props = {
  children: ReactNode;
  user: User;
};

export default function MainLayout({ children, user }: Props) {
  return (
    <UserContext.Provider value={user}>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-layout__main-area">
          <Header />
          <main className="dashboard-layout__content">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

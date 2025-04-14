"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "@supabase/supabase-js";
import { UserContext } from "@/context/UserContext";
import SectionHeading from "../common/SectionHeading";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  user: User;
};

export default function MainLayout({ children, user }: Props) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";


  return (
    <UserContext.Provider value={user}>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-layout__main-area">
          <Header />
          <main className="dashboard-layout__content">
            {isDashboard && (
              <div className="dashboard-layout__heading">
                <SectionHeading title={`Welcome ${user.user_metadata?.full_name || ""}!`} />
                <p>
                  Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eleifend laoreet.
                  Link
                </p>
              </div>
            )}

            {children}
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

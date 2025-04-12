"use client";
import { UserContext } from "@/context/UserContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={user}>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="main-area">
          <Header />
          <main className="dashboard-content">{children}</main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

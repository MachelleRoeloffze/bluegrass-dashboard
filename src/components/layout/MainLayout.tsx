"use client";
import { UserContext } from "@/context/UserContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

type User = {
  name: string;
  email: string;
  picture?: string;
};

interface MainLayoutProps {
  user: User;
  children: React.ReactNode;
}

export default function MainLayout({ user, children }: MainLayoutProps) {
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

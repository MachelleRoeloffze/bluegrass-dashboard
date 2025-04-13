"use client";

import { UserContext } from "@/context/UserContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardSkeleton from "@/components/dashboard/skeletonLoaders/DashboardSkeleton";

type User = {
  name: string;
  email: string;
  picture?: string;
};

interface MainLayoutProps {
  user: User | null;
  children: React.ReactNode;
}

export default function MainLayout({ user, children }: MainLayoutProps) {
  if (!user) return <DashboardSkeleton />;

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

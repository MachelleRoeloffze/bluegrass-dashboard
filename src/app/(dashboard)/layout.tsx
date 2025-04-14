import { getUser } from "@/lib/auth";
import MainLayout from "@/components/layout/MainLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <MainLayout user={user}>{children}</MainLayout>;
}

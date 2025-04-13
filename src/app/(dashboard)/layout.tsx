import { getUser } from "@/lib/auth";
import MainLayout from "@/components/layout/MainLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
 
    return <p>Not logged in</p>;
  }

  return <MainLayout user={user}>{children}</MainLayout>;
}

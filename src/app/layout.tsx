import { Montserrat } from "next/font/google";
import "@/styles/globals.scss";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();
  if (!user) redirect("/api/auth/login");

  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}

import "@/styles/globals.scss";

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

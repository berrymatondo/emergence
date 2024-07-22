import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/nav/sidebar";

export const metadata: Metadata = {
  title: "Emergence",
  description: "Outil d'optimisation de l'activité des marchés financiers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="flex">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

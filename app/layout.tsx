import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/nav/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/nav/header";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="md:container w-full flex flex-col items-center">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

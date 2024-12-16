import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/nav/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/nav/header";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import { auth } from "@/auth";
import Image from "next/image";
import rdc from "../public/rdc5.jpg";

export const metadata: Metadata = {
  title: "Emergence",
  description: "Outil d'optimisation de l'activité des marchés financiers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  //if (session && session.user) console.log("USER", session.user);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="flex bg-card ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Sidebar userSession={session} />
            <div className="md:mx-4 w-full flex flex-col items-center">
              <Header userSession={session} />
              {children}
            </div>
            <Toaster richColors />
          </Providers>
        </ThemeProvider>
        <Image alt="bg" src={rdc} fill quality={100} className="-z-50 " />
      </body>
    </html>
  );
}

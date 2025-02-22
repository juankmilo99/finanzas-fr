import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/context/SidebarContext";


const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanzasApp | Controla tus finanzas",
  description: "Bienvenido a FinanzasApp, la aplicación para controlar tus finanzas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         <AuthProvider>
          <SidebarProvider>
          {children}
          </SidebarProvider>
          </AuthProvider>
         
         </ThemeProvider>
      </body>
    </html>
  );
}

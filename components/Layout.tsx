"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Sidebar con altura mínima de pantalla */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-grow p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

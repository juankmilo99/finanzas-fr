"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CircleDollarSign, Target, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: <Home className="w-6 h-6" /> },
  { name: "Agregar Transacción", href: "/transacciones", icon: <CircleDollarSign className="w-6 h-6" /> },
  { name: "Agregar Objetivo", href: "/objetivos", icon: <Target className="w-6 h-6" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isCollapsed } = useSidebar(); // Estado global del Sidebar

  return (
    <aside
      className={`min-h-screen transition-all duration-300 border-r dark:border-gray-700 flex flex-col 
        bg-white dark:bg-[#1f2937] text-gray-900 dark:text-gray-100 
        ${isCollapsed ? "w-16" : "w-80"} overflow-hidden`}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className={`flex items-center gap-2 text-2xl font-bold mb-6 transition-all cursor-pointer p-3 
        ${isCollapsed ? "justify-center" : ""}`}
      >
        <Image src="/icon-finances.png" alt="Finanzas App Icon" width={30} height={30} />
        {!isCollapsed && <span>FinanzasApp</span>}
      </Link>

      {/* Menú */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                ${
                  pathname === item.href
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }
                ${isCollapsed ? "justify-center" : ""}`} // Centra los íconos cuando está colapsado
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <Button
        onClick={logout}
        className={`mt-auto flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded transition-all 
        ${isCollapsed ? "justify-center w-12 h-12 p-0" : ""}`}
      >
        <LogOut className="w-6 h-6" />
        {!isCollapsed && <span>Logout</span>}
      </Button>
    </aside>
  );
}

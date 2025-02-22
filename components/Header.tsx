"use client";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { Menu } from "lucide-react"; // Icono de menú
import ToggleTheme from "@/components/toggle-theme";

export default function Header() {
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar(); // Usamos el contexto para manejar el Sidebar

  return (
    <header className="w-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow px-6 py-4 flex justify-between items-center">
      {/* Botón para colapsar el Sidebar */}
      <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
        <Menu className="w-6 h-6 text-gray-800 dark:text-gray-100" />
      </button>

    
      {/* Controles */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-300">{user?.name}</span>
        <ToggleTheme />
      </div>
    </header>
  );
}

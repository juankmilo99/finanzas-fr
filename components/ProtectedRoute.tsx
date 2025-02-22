"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader"; 

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {       

    if (!loading && !user) {     
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loader />; // ⬅️ Mostramos un mensaje de carga mientras se verifica el usuario

  if (!user) return null; // Evitamos renderizar contenido hasta saber si el usuario está autenticado

  return <>{children}</>;
}

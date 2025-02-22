"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ⬅️ No hacer nada hasta que `loading` sea `false`

    if (user) {   
      router.replace("/dashboard");
    } else {      
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loader />; // ⬅️ Mostrar un loader mientras carga el usuario

  return null;
}

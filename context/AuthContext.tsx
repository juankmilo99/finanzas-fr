"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
  loadingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const router = useRouter();

  // 🔹 Cargar usuario si hay token en localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("token");  

    if (token) {
      api.get("/users/profile")
        .then((res) => {          
          setUser(res.data);
          console.log("User is authenticated"+res.data);
        })
        .catch((err) => {      
          logout();
        })
        .finally(() => setLoading(false)); // ⬅️ Marcamos que la autenticación terminó
    } else {
      setLoading(false); // ⬅️ No hay token, pero ya terminamos de cargar
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoadingAuth(true); 
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      const profileRes = await api.get("/users/profile");
      console.log("User is authenticated"+profileRes.data);
      setUser(profileRes.data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoadingAuth(true);
    try {
      await api.post("/users/register", { name, email, password });
      await login(email, password);
    } catch (error) {
      console.error("Error en registro:", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loadingAuth  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de AuthProvider");
  }
  return context;
};

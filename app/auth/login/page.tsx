"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/toggle-theme";

export default function LoginPage() {
  const { login, loadingAuth } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          />
          <Button
            type="submit"
            className="w-full p-2 bg-[#475569] hover:bg-[#334155] text-white rounded flex items-center justify-center transition-all"
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cargando...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-center mt-2 text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account? <a href="/auth/register" className="text-blue-500">Sign up</a>
        </p>

        <div className="mt-4 flex justify-center">
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}

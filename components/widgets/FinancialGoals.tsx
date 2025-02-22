"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Loader2, Calendar } from "lucide-react";

interface FinancialGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  due_date: string; // Cambiar a string si la API devuelve fechas en este formato
}

export default function FinancialGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get("/goals/user");
        setGoals(res.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          setGoals([]); // Si no hay objetivos, tratamos 404 como una respuesta válida
        } else {
          console.error("Error fetching goals:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchGoals();
    }
  }, [user]);
  

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">Objetivos Financieros</h2>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : goals.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No tienes objetivos financieros</p>
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => {
            const formattedDate = new Date(goal.due_date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <li key={goal.id} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{goal.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {goal.current_amount} / {goal.target_amount} USD
                  </p>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formattedDate}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

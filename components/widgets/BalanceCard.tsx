"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Loader2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface BalanceData {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export default function BalanceCard() {
  const { user } = useAuth();
  const [data, setData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await api.get("/finances/balance");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBalance();
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center">Balance General</h2>

      {loading ? (
        <div className="flex justify-center mt-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : data ? (
        <div className="mt-6 space-y-6">
          {/* Balance */}
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              ${data.balance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Saldo disponible</p>
          </div>

          <div className="flex justify-between items-center text-lg">
            {/* Total Ingresos */}
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUpCircle className="w-6 h-6 mr-3" />
              <div>
                <p className="text-xl font-semibold">${data.totalIncome.toLocaleString()}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Ingresos</p>
              </div>
            </div>

            {/* Total Gastos */}
            <div className="flex items-center text-red-500 dark:text-red-400">
              <ArrowDownCircle className="w-6 h-6 mr-3" />
              <div>
                <p className="text-xl font-semibold">${data.totalExpenses.toLocaleString()}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Gastos</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">Error al cargar datos</p>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Loader2, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface MetricsData {
    savingsRate?: number;
    dailySpendingAvg?: number;
    topExpenseCategory?: string;
    incomeVsExpenses?: { income: number; expenses: number };
  }
  
  export default function FinancialMetrics() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const res = await api.get("/metrics");
          setMetrics(res.data);
        } catch (error) {
          console.error("Error fetching metrics:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (user) {
        fetchMetrics();
      }
    }, [user]);
  
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">Otras Métricas</h2>
  
        {loading ? (
  <div className="flex justify-center">
    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
  </div>
) : !metrics || 
    (metrics.savingsRate === 0 && 
    metrics.dailySpendingAvg === 0 && 
    (!metrics.topExpenseCategory || metrics.topExpenseCategory === "N/A")) ? (
  <p className="text-gray-500 dark:text-gray-400 text-center">
    No hay métricas disponibles por ahora
  </p>
) : (
  <div className="space-y-4">
    {/* Tasa de Ahorro */}
    {metrics.savingsRate !== 0 && metrics.savingsRate !== undefined && (
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tasa de Ahorro</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{metrics.savingsRate.toFixed(2)}%</p>
        </div>
        <TrendingUp className="text-green-500 w-6 h-6" />
      </div>
    )}

    {/* Promedio de Gasto Diario */}
    {metrics.dailySpendingAvg !== 0 && metrics.dailySpendingAvg !== undefined && (
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Promedio de Gasto Diario</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ${metrics.dailySpendingAvg.toFixed(2)} USD
          </p>
        </div>
        <TrendingDown className="text-red-500 w-6 h-6" />
      </div>
    )}

    {/* Mayor Gasto */}
    {metrics.topExpenseCategory && metrics.topExpenseCategory !== "N/A" && (
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Mayor Gasto</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{metrics.topExpenseCategory}</p>
        </div>
        <BarChart3 className="text-blue-500 w-6 h-6" />
      </div>
    )}
  </div>
)}


      </div>
    );
  }
  
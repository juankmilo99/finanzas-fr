"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";

export default function IncomeExpenseChart() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await api.get("/finances/summary");

        const formattedData = res.data.map((entry: any) => ({
          month: `${entry.month} ${entry.year}`,
          income: Number(entry.income) || 0,
          expense: Number(entry.expense) || 0
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChartData();
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-full">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">Ingresos vs Gastos</h2>
      {loading ? (
  <div className="flex justify-center">
    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
  </div>
) : data.length === 0 ? (
  <div className="text-gray-500 dark:text-gray-400 text-center py-10">
    No hay datos suficientes para generar el gráfico
  </div>
) : (
  <ScrollArea className="w-full overflow-x-auto">
    <div className="min-w-[550px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#8884d8" textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff", color: theme === "dark" ? "#e2e8f0" : "#1e293b", borderRadius: "8px", border: "none" }} />
          <Bar dataKey="income" fill="#22c55e" name="Ingresos" />
          <Bar dataKey="expense" fill="#ef4444" name="Gastos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
)}
    </div>
  );
}

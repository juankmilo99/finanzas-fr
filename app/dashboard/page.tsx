"use client";

import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import BalanceCard from "@/components/widgets/BalanceCard";
import FinancialGoals from "@/components/widgets/FinancialGoals";
import FinancialMetrics from "@/components/widgets/FinancialMetrics";
import IncomeExpenseChart from "@/components/widgets/IncomeExpenseChart";
import RecentTransactions from "@/components/widgets/RecentTransactions";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6">
          {/* Título Dashboard */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Dashboard
          </h1>

          {/* Contenido del Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primera fila: Balance y Gráfico con la misma altura */}
            <div className="lg:col-span-1 flex flex-col">
              <BalanceCard />
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <IncomeExpenseChart />
            </div>

            {/* Segunda fila con el resto de los widgets */}
            <div className="lg:col-span-1">
              <RecentTransactions />
            </div>
            <div className="lg:col-span-1">
              <FinancialGoals />
            </div>
            <div className="lg:col-span-1">
              <FinancialMetrics />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

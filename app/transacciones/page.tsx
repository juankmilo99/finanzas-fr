"use client";

import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import FormTransaction from "@/components/forms/FormTransaction";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function TransactionsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6">
            <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Agregar Transacción" }]} />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Agregar Transacción</h1>
          <FormTransaction />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

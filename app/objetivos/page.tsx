"use client";

import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import FormGoal from "@/components/forms/FormGoal";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6">
        <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Agregar Objetivo" }]} />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Agregar Objetivo</h1>
          <FormGoal />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function FormGoal() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    target_amount: "",
    current_amount: "",
    due_date: "",
  });

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.target_amount || !form.current_amount || !form.due_date) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      await api.post("/goals", {
        name: form.name,
        target_amount: parseFloat(form.target_amount),
        current_amount: parseFloat(form.current_amount),
        due_date: form.due_date,
      });

      toast.success("Objetivo agregado correctamente");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al agregar objetivo:", error);
      toast.error("Hubo un error al agregar el objetivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
        Agregar Objetivo Financiero
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre del objetivo */}
        <div>
          <Label htmlFor="name">Nombre del Objetivo</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej: Ahorrar para un coche"
            required
          />
        </div>

        {/* Monto objetivo */}
        <div>
          <Label htmlFor="target_amount">Monto Objetivo</Label>
          <Input
            type="number"
            id="target_amount"
            name="target_amount"
            value={form.target_amount}
            onChange={handleChange}
            placeholder="Ej: 10000"
            required
          />
        </div>

        {/* Monto actual */}
        <div>
          <Label htmlFor="current_amount">Monto Actual</Label>
          <Input
            type="number"
            id="current_amount"
            name="current_amount"
            value={form.current_amount}
            onChange={handleChange}
            placeholder="Ej: 1000"
            required
          />
        </div>

        {/* Fecha límite */}
        <div>
          <Label htmlFor="due_date">Fecha Límite</Label>
          <Input
            type="date"
            id="due_date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón de enviar */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Agregar Objetivo"}
        </Button>
      </form>
    </div>
  );
}

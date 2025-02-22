"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function FormTransaction() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category_id: "",
    transaction_date: "",
  });

  // Obtener categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    if (user) {
      fetchCategories();
    }
  }, [user]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, category_id: value });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.category_id || !form.transaction_date) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      await api.post("/transactions", {
        amount: parseFloat(form.amount),
        description: form.description,
        category_id: parseInt(form.category_id),
        transaction_date: form.transaction_date,
      });

      toast.success("Transacción agregada correctamente");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al agregar transacción:", error);
      toast.error("Hubo un error al agregar la transacción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
        Agregar Transacción
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Monto */}
        <div>
          <Label htmlFor="amount">Monto</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Ej: 100.50"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ej: Compra de comida"
            required
          />
        </div>

        {/* Categoría (ComboBox) */}
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fecha */}
        <div>
          <Label htmlFor="transaction_date">Fecha</Label>
          <Input
            type="date"
            id="transaction_date"
            name="transaction_date"
            value={form.transaction_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón de enviar */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Agregar Transacción"}
        </Button>
      </form>
    </div>
  );
}

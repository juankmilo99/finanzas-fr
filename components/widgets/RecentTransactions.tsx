"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  name: string;
  type: "income" | "expense";
}

interface Transaction {
  id: number;
  amount: number;
  description: string;
  category_id: number;
  user_id: number;
  transaction_date: string;
  created_at: string;
  Category: Category;
}

export default function RecentTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions/recent");
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">Últimas Transacciones</h2>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">No hay transacciones recientes</p>
      ) : (
        <ScrollArea className="h-64">
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{transaction.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(transaction.transaction_date).toLocaleDateString()}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    transaction.Category.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.Category.type === "income" ? "+" : "-"} {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}

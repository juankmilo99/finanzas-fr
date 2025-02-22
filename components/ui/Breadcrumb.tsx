import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-4 flex items-center text-gray-600 dark:text-gray-400 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-900 dark:hover:text-gray-100">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900 dark:text-gray-300">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4 mx-2" />}
        </div>
      ))}
    </nav>
  );
}

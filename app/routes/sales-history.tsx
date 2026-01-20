import type { Route } from "./+types/sales-history"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import SalesPage from "~/pages/SalesPage"
import SalesHistoryPage from "~/pages/SalesHistoryPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sales History" },
    { name: "description", content: "Riwayat Penjualan" },
  ]
}

export default function SalesHistory() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <SalesHistoryPage />
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

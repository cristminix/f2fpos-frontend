import type { Route } from "./+types/sales"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import SalesPage from "~/pages/pos/SalesPage"

export function meta({}: Route.MetaArgs) {
  return [{ title: "Sales POS" }, { name: "description", content: "Main Pos" }]
}

export default function Sales() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <SalesPage />
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

import type { Route } from "./+types/master-product"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import MasterProductPage from "~/pages/MasterProductPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Master Produk" },
    { name: "description", content: "Master Produk" },
  ]
}

export default function MasterProduct() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <MasterProductPage />
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

import type { Route } from "./+types/suppliers"
import ProtectedLayout from "../components/layouts/ProtectedLayout"
import { SupplierPage } from "../pages/SupplierPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Supplier Management" },
    { name: "description", content: "Manage suppliers" },
  ]
}

export default function SupplierRoute() {
  return (
    <ProtectedLayout>
      <SupplierPage />
    </ProtectedLayout>
  )
}

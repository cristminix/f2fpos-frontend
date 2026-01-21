import type { Route } from "./+types/suppliers"
import ProtectedLayout from "../components/layouts/ProtectedLayout"
import { Supplier } from "../pages/Supplier"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Supplier Management" },
    { name: "description", content: "Manage suppliers" },
  ]
}

export default function SupplierRoute() {
  return (
    <ProtectedLayout>
      <Supplier />
    </ProtectedLayout>
  )
}

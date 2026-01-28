import type { Route } from "./+types/purchase-orders"
import ProtectedLayout from "../../components/layouts/ProtectedLayout"
import { PurchaseOrderPage } from "../../pages/pos/PurchaseOrderPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Purchase Orders Management" },
    { name: "description", content: "Manage purchase orders" },
  ]
}

export default function PurchaseOrdersRoute() {
  return (
    <ProtectedLayout>
      <PurchaseOrderPage />
    </ProtectedLayout>
  )
}

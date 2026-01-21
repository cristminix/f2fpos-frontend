import type { Route } from "./+types/stock-adjustment"
import ProtectedLayout from "../components/layouts/ProtectedLayout"
import { StockAdjustmentPage } from "../pages/StockAdjustmentPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Stock Adjustment" },
    { name: "description", content: "Manage stock adjustments" },
  ]
}

export default function StockAdjustmentRoute() {
  return (
    <ProtectedLayout>
      <StockAdjustmentPage />
    </ProtectedLayout>
  )
}

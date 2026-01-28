import type { Route } from "./+types/owner-report"
import ProtectedLayout from "../../components/layouts/ProtectedLayout"
import OwnerReportPage from "../../pages/pos/OwnerReportPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owner Report" },
    { name: "description", content: "Owner report dashboard and analytics" },
  ]
}

export default function OwnerReportRoute() {
  return (
    <ProtectedLayout>
      <OwnerReportPage />
    </ProtectedLayout>
  )
}

import type { Route } from "./+types/dashboard"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import DashboardPage from "~/pages/pos/DashboardPage"

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }, { name: "description", content: "Dashboard" }]
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <DashboardPage />
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

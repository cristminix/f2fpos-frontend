import type { Route } from "./+types/shift-report"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import ShiftReportPage from "~/pages/ShiftReportPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Laporan Shift" },
    { name: "description", content: "Laporan Shift" },
  ]
}

export default function ShiftReport() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <ShiftReportPage />
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

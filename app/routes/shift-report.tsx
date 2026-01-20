import type { Route } from "./+types/shift-report"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"

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
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Laporan Shift</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              Halaman laporan shift masih dalam pengembangan.
            </p>
          </div>
        </div>
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

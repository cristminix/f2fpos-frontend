import type { Route } from "./+types/staff"
import ProtectedLayout from "../../components/layouts/ProtectedLayout"
import { StaffPage } from "../../pages/pos/StaffPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Staff Management" },
    { name: "description", content: "Manage staff members" },
  ]
}

export default function StaffRoute() {
  return (
    <ProtectedLayout>
      <StaffPage />
    </ProtectedLayout>
  )
}

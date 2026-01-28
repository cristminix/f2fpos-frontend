import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import MemberManagementPage from "~/pages/admin/MemberManagementPage"

export default function Members() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <MemberManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

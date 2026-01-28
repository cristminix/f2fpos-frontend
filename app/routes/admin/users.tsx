import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import UserManagementPage from "~/pages/admin/UserManagementPage"

export default function Users() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <UserManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

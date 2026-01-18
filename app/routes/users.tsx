import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"

export default function Users() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div>
          <ResponsiveGrid />
          <h1>Users Management</h1>
          <p>This is the users management page with protected access.</p>
        </div>
      </AdminLayout>
    </RoleGuard>
  )
}

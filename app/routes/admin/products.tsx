import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import ProductManagementPage from "~/pages/admin/ProductManagementPage"

export default function Products() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <ProductManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

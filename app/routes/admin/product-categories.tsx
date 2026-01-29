import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import ProductCategoryManagementPage from "~/pages/admin/ProductCategoryManagementPage"

export default function ProductCategories() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <ProductCategoryManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

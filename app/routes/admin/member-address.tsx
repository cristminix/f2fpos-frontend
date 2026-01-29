import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import MemberAddressManagementPage from "~/pages/admin/MemberAddressManagementPage"

export default function MemberAddress() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <MemberAddressManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

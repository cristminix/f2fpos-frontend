import { ResponsiveGrid } from "~/components/layouts/ResponsiveGrid"
import RoleGuard from "~/components/guards/RoleGuard"
import AdminLayout from "~/components/layouts/AdminLayout"
import MemberBankAccountManagementPage from "~/pages/admin/MemberBankAccountManagementPage"

export default function MemberBankAccounts() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <MemberBankAccountManagementPage />
      </AdminLayout>
    </RoleGuard>
  )
}

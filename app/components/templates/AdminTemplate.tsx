import React, { type ReactNode } from "react"
import Navigation from "~/components/ui/admin/Navigation"

const AdminTemplate: React.FC<{
  children: ReactNode
  showAdminNav?: boolean
}> = ({ children, showAdminNav = true }) => {
  return (
    <div className="admin-template flex min-h-screen">
      <div className="flex-1">
        <header className="bg-red-100 p-4 shadow-md flex">
          {showAdminNav && <Navigation />} <h1 className="p-3">Admin Area</h1>
        </header>
        <main className=" p-4">{children}</main>
      </div>
    </div>
  )
}

export default AdminTemplate

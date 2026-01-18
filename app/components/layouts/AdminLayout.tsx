import React, { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useTemplate } from "../../contexts/TemplateContext"
import { Outlet, Navigate, useLocation } from "react-router"
import AccessDenied from "../common/AccessDenied"

import type { ReactNode } from "react"

interface AdminLayoutProps {
  children?: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const {
    component: Template,
    props: templateProps,
    setTemplate,
  } = useTemplate()
  const location = useLocation()

  useEffect(() => {
    setTemplate("admin")
  }, [])

  if (loading) return <div>Loading...</div>

  // Hapus pengecekan akses karena sudah ditangani oleh RoleGuard
  if (!user || user.role !== "admin") {
    return <AccessDenied pathname={location.pathname} />
  }

  return <Template {...templateProps}>{children || <Outlet />}</Template>
}

export default AdminLayout

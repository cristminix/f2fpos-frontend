import React, { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useTemplate } from "../../contexts/TemplateContext"
import { Outlet, Navigate } from "react-router"

import type { ReactNode } from "react"

interface ProtectedLayoutProps {
  children?: ReactNode
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const {
    component: Template,
    props: templateProps,
    setTemplate,
  } = useTemplate()

  useEffect(() => {
    setTemplate("protected")
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return <Template {...templateProps}>{children || <Outlet />}</Template>
}

export default ProtectedLayout

import React, { useEffect } from "react"
import { useTemplate } from "../../contexts/TemplateContext"
import { Outlet } from "react-router"

import type { ReactNode } from "react"

interface PublicLayoutProps {
  children?: ReactNode
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const {
    component: Template,
    props: templateProps,
    setTemplate,
  } = useTemplate()

  useEffect(() => {
    setTemplate("public")
  }, [])

  return <Template {...templateProps}>{children || <Outlet />}</Template>
}

export default PublicLayout

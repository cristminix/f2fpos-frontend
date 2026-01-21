import React, { useEffect } from "react"
import { useTemplate } from "../../contexts/TemplateContext"
import { Outlet } from "react-router"

import type { ReactNode } from "react"

interface SingleLayoutProps {
  children?: ReactNode
}

const SingleLayout: React.FC<SingleLayoutProps> = ({ children }) => {
  const {
    component: Template,
    props: templateProps,
    setTemplate,
  } = useTemplate()

  useEffect(() => {
    setTemplate("single")
  }, [])

  return <Template {...templateProps}>{children || <Outlet />}</Template>
}

export default SingleLayout

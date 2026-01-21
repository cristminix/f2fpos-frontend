import React, { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import PublicTemplate from "~/components/templates/PublicTemplate"
import ProtectedTemplate from "~/components/templates/ProtectedTemplate"
import AdminTemplate from "~/components/templates/AdminTemplate"
import SingleTemplate from "~/components/templates/SingleTemplate"
interface TemplateConfig {
  component: React.ComponentType<any>
  props: Record<string, any>
  title: string
}

interface TemplateContextType {
  component: React.ComponentType<any>
  props: Record<string, any>
  title: string
  currentTemplate: string
  templates: Record<string, TemplateConfig>
  setTemplate: (templateName: string) => void
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined,
)

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTemplate, setCurrentTemplate] = useState("public")

  const templates: Record<string, TemplateConfig> = {
    public: {
      component: PublicTemplate,
      props: { showHeader: true, showFooter: true },
      title: "Public Template",
    },
    protected: {
      component: ProtectedTemplate,
      props: { showSidebar: true },
      title: "Protected Template",
    },
    admin: {
      component: AdminTemplate,
      props: { showAdminNav: true },
      title: "Admin Template",
    },
    single: {
      component: SingleTemplate,
      props: { showAdminNav: false },
      title: "Single Template",
    },
  }

  const setTemplate = (templateName: string) => {
    if (templates[templateName]) {
      setCurrentTemplate(templateName)
    } else {
      console.warn(`Template ${templateName} not found, using public template`)
      setCurrentTemplate("public")
    }
  }

  const value: TemplateContextType = {
    ...templates[currentTemplate],
    setTemplate,
    currentTemplate,
    templates,
  }

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext)
  if (context === undefined) {
    throw new Error("useTemplate must be used within a TemplateProvider")
  }
  return context
}

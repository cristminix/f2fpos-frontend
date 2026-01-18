import React, { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import Navigation from "~/components/ui/Navigation"

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

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

// Default template components
const PublicTemplate: React.FC<{
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}> = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="public-template">
      {showHeader && (
        <header className="bg-gray-100 p-4 shadow-md">
          <h1>Public Header</h1>
        </header>
      )}
      <main className="container mx-auto p-4">{children}</main>
      {showFooter && <footer className="bg-gray-100 p-4 mt-8 border-t">Public Footer</footer>}
    </div>
  )
}

const ProtectedTemplate: React.FC<{
  children: ReactNode
  showSidebar?: boolean
}> = ({ children, showSidebar = true }) => {
  return (
    <div className="protected-template flex">
      <div className="flex-1">
        <header className="bg-gray-100 p-2 shadow-md flex">
          {showSidebar && <Navigation />} <h1 className="p-3">Protected Area</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  )
}

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
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  )
}

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>
}

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext)
  if (context === undefined) {
    throw new Error("useTemplate must be used within a TemplateProvider")
  }
  return context
}

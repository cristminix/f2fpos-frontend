import React, { type ReactNode } from "react"
import Navigation from "~/components/ui/Navigation"

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

export default ProtectedTemplate

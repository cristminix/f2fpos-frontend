import React, { type ReactNode } from "react"
import Navigation from "~/components/ui/Navigation"

const ProtectedTemplate: React.FC<{
  children: ReactNode
  showSidebar?: boolean
}> = ({ children, showSidebar = true }) => {
  return (
    <div className="protected-template flex">
      <div className="flex-1 w-full">
        <header className="bg-gray-100 px-4 py-2 shadow-md flex">
          <div className="pl-2 flex">
            {showSidebar && <Navigation />} <h1 className="pt-3">F2F POS</h1>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

export default ProtectedTemplate

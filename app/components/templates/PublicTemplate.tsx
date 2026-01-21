import React, { type ReactNode } from "react"

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
      {showFooter && (
        <footer className="bg-gray-100 p-4 mt-8 border-t">Public Footer</footer>
      )}
    </div>
  )
}

export default PublicTemplate

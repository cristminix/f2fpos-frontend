import React, { type ReactNode } from "react"

const SingleTemplate: React.FC<{
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}> = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="public-template">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}

export default SingleTemplate

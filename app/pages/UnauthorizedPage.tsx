import React from "react"
import AccessDenied from "../components/common/AccessDenied"

const UnauthorizedPage: React.FC = () => {
  return <AccessDenied pathname="/unauthorized" />
}

export default UnauthorizedPage

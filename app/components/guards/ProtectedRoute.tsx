import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, useLocation } from "react-router"

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
}) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Navigate, useLocation } from "react-router"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Tampilkan loading saat data user masih dimuat
  if (loading) {
    console.log("RoleGuard: Loading user data...")
    return <div>Loading...</div>
  }

  console.log({ user, loading, allowedRoles })

  // Periksa apakah user sudah login
  if (!user) {
    console.log("RoleGuard: No user found, redirecting to login")
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Pastikan user memiliki role
  if (!user.role) {
    console.log("RoleGuard: User has no role, redirecting to unauthorized")
    return <Navigate to="/unauthorized" replace />
  }

  // Periksa apakah user memiliki role yang diizinkan
  if (!allowedRoles.includes(user.role)) {
    console.log(
      `RoleGuard: User role '${user.role}' not in allowed roles [${allowedRoles.join(", ")}], redirecting to unauthorized`,
    )
    return <Navigate to="/unauthorized" replace />
  }

  console.log("RoleGuard: Access granted")
  return <>{children}</>
}

export default RoleGuard

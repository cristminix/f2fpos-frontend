import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"

const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Panggil fungsi logout untuk menghapus sesi pengguna
    logout()
    // Arahkan pengguna ke halaman login setelah logout
    navigate("/login")
  }, [logout, navigate])

  return (
    <div>
      <p>Logging out...</p>
    </div>
  )
}

export default LogoutPage

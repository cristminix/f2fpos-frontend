import type { Route } from "../+types/home"

import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // Panggil fungsi logout untuk menghapus sesi pengguna

    // Arahkan pengguna ke halaman login setelah logout
    navigate("/dashboard")
  }, [navigate])
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <div>
          <p>redirecting ...</p>
        </div>
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

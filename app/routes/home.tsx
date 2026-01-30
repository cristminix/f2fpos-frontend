import type { Route } from "./+types/home"

import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"
import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import HomePage from "~/pages/web/HomePage"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "B2B App" },
    { name: "description", content: "Welcome to B2B App!" },
  ]
}

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    // Panggil fungsi logout untuk menghapus sesi pengguna
    // Arahkan pengguna ke halaman login setelah logout
    // navigate("/admin/users")
  }, [navigate])
  return (
    <HomePage />
  )
}

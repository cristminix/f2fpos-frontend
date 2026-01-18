import type { Route } from "./+types/home"
import { Welcome } from "../pages/welcome"
import App from "~/App"
import ProtectedRoute from "~/components/guards/ProtectedRoute"
import ProtectedLayout from "~/components/layouts/ProtectedLayout"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </ProtectedLayout>
    </ProtectedRoute>
  )
}

import type { Route } from "./+types/my-outlet"
import ProtectedLayout from "../components/layouts/ProtectedLayout"
import { MyOutletPage } from "../pages/MyOutletPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Outlet Management" },
    { name: "description", content: "Manage my outlet information" },
  ]
}

export default function MyOutletRoute() {
  return (
    <ProtectedLayout>
      <MyOutletPage />
    </ProtectedLayout>
  )
}

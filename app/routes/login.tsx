import LoginPage from "~/pages/LoginPage"
import SingleLayout from "../components/layouts/SingleLayout"
import type { Route } from "../+types/root"

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }]
}
export default function Users() {
  return (
    <SingleLayout>
      <LoginPage />
    </SingleLayout>
  )
}

import type { Route } from "./+types/master-ingredient"
import ProtectedLayout from "../../components/layouts/ProtectedLayout"
import { MasterIngredient } from "../../pages/pos/MasterIngredient"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Master Ingredient Management" },
    { name: "description", content: "Manage ingredients" },
  ]
}

export default function MasterIngredientRoute() {
  return (
    <ProtectedLayout>
      <MasterIngredient />
    </ProtectedLayout>
  )
}

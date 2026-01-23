import type { Route } from "./+types/master-ingredient";
import ProtectedLayout from "../components/layouts/ProtectedLayout";
import { MasterIngredient } from "../pages/MasterIngredient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Master Bahan Baku" },
    { name: "description", content: "Master Bahan Baku" },
  ];
}

export default function MasterIngredientRoute() {
  return (
    <ProtectedLayout>
      <MasterIngredient />
    </ProtectedLayout>
  );
}

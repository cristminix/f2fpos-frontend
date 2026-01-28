import type { Route } from "./+types/product-category"
import ProtectedLayout from "../../components/layouts/ProtectedLayout"
import { ProductCategoryPage } from "../../pages/pos/ProductCategoryPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Category Management" },
    { name: "description", content: "Manage product categories" },
  ]
}

export default function ProductCategoryRoute() {
  return (
    <ProtectedLayout>
      <ProductCategoryPage />
    </ProtectedLayout>
  )
}
